import moment from 'moment';
import Firebase from 'firebase';
import map from 'lodash/map';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import storeUser from './stores/user.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  storageBucket: process.env.FIREBASE_storageBucket
};
const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
var storage = Firebase.storage();
var storageRef = storage.ref();

const debounceTime = 500;
const dateFormat = 'YYYY-MM-DD';

const defaultTemplate = `
  <h1>Top 3 Priorities</h1>
  <ul data-checked="false">
    <li>#1</li>
    <li>#2</li>
    <li>#3</li>
  </ul>
  <h1>Todos</h1>
  <ul data-checked="false">
    <li> </li>
  </ul>
  <h1>Notes</h1>
  <ul>
    <li> </li>
  </ul>
  <h1>Reflection</h1>
  <ul>
    <li>What went well today?</li>
    <li>What challenges did you face?</li>
  </ul>
`;
const journalDefaults = {
  today: defaultTemplate,
  todayTemplate: defaultTemplate,
  notepad: `
    <h1>Todos Later</h1>
    <ul data-checked="false">
      <li> </li>
    </ul>
    <h1>Goals</h1>
    <h2>Journal Everyday</h2>
    <ul data-checked="false">
      <li> </li>
    </ul>
  `,
  showHelp: true,
  todayDate: moment().format()
};

let state = {};

export default {
  ...storeUser(app),
  setNotification: function (text) {
    state.notificationMessage = text;
    state.notificationDate = Date.now();
  },
  clearNotification: function () {
    state.notificationMessage = '';
    state.notificationDate = Date.now();
  },
  errorNotification: function (text) {
    this.clearNotification();
    alert(text);
  },
  clear: function () {
    state.localLastUpdated = null;
    state.version = null;
    state.user = null;
    state.dailyNotes = [];
    state.dailyNotesCursor = null;
    state.loading = {user: false, journal: false, history: false};
    this.setLoading();
  },
  initialize: function (app) {
    state = app;
  },
  hideHelp: function (data) {
    if (!state.user) { return; }
    return db.ref('journal/' + state.user.uid).update({showHelp: false});
  },
  setLoading: function (options) {
    Object.assign(state.loading, options);
  },
  checkVersion: function () {
    db.ref('config/version').once('value', (snapshot) => {
      const version = snapshot.val();
      if (state.version && state.version !== version) {
        window.location.reload();
      } else {
        state.version = version;
      }
    });
  },
  checkLastUpdated: function () {
    if (state.journal.lastUpdated !== state.localLastUpdated) {
      window.location.reload();
    }
  },
  uploadImageHandler: function (image, callback) {
    const uniqueId = moment().unix();
    const name = `${uniqueId}-${image.name}`;
    const uploadTask = storageRef.child(`dailyNotes/${state.user.uid}/${state.journal.todayDate}/${name}`).put(image);
    uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setNotification(`Uploading image: ${progress}%`);
    }, (error) => {
      this.errorNotification(`Cannot upload the image. (${error.code})`);
    }, () => {
      this.clearNotification();
      callback(uploadTask.snapshot.downloadURL);
    });
  },
  setUser: function (user) {
    if (!user) {
      return this.clear();
    }
    state.user = user.toJSON();
    this.setLoading({user: false});
    mixpanel.identify(user.uid);
    mixpanel.people.set({'$name': state.user.displayName, '$email': state.user.email});
  },
  getNewTodayDate: function () {
    if (moment(state.journal.todayDate).isSame(moment(), 'day')) { // if transferred on current day we return tomorrow
      return moment().add(1, 'day').format(dateFormat);
    }
    return moment().format(dateFormat); // otherwise we return today
  },
  getArchives: function (date) {
    if (!state.user) { return; }
    state.dailyNotes = [];
    this.setLoading({history: true});
    let query = db.ref(`dailyNotes/${state.user.uid}`).orderByChild('orderDesc');
    const start = moment(date, 'YYYY-MM-DD').startOf('month').unix();
    const end = moment(date, 'YYYY-MM-DD').endOf('month').unix();
    query = query.startAt(-end).endAt(-start);
    return query.once('value', (snapshot) => {
      const notes = map(snapshot.val(), (note, id) => {
        const dateFormatted = moment(note.date).format('dddd[,] LL');
        return Object.assign(note, {id, dateFormatted});
      });
      sortBy(notes, note => note.orderDesc).forEach((note, i) => {
        state.dailyNotes.push(note);
      });
      this.setLoading({history: false});
    });
  },
  getAll: function () {
    if (!state.user) { return; }
    state.dailyNotes = [];
    this.setLoading({history: true});
    const query = db.ref(`dailyNotes/${state.user.uid}`).orderByChild('orderDesc');
    return query.once('value', (snapshot) => {
      const notes = map(snapshot.val(), (note, id) => {
        const dateFormatted = moment(note.date).format('dddd[,] LL');
        return Object.assign(note, {id, dateFormatted});
      });
      sortBy(notes, note => note.orderDesc).forEach((note, i) => {
        state.dailyNotes.push(note);
      });
      console.log('notes', notes);
      this.setLoading({history: false});
    });
  },
  updateDefaultTodayTemplate: function (html) {
    journalDefaults.today = html;
    journalDefaults.todayTemplate = html;
  },
  loadJournal: function () {
    if (!state.user) { return; }
    this.setLoading({journal: true});
    db.ref('journal/' + state.user.uid).on('value', (snapshot) => {
      const savedJournal = snapshot.val();
      if (!savedJournal) {
        this.saveJournal(journalDefaults);
      } else {
        if (!state.localLastUpdated) {
          state.localLastUpdated = savedJournal.lastUpdated;
        } else if (savedJournal.lastUpdated !== state.localLastUpdated) {
          window.location.reload();
        }
        state.journal = Object.assign({}, journalDefaults, savedJournal);
        this.setLoading({journal: false});
      }
    });
  },
  saveJournal: function (data, options = {}) {
    const config = Object.assign({debounce: false}, options);
    if (!state.user) { return; }
    const cleanedData = pick(data, keys(journalDefaults));
    Object.assign(state.journal, cleanedData);
    state.localLastUpdated = moment().format();
    cleanedData.lastUpdated = state.localLastUpdated;
    if (config.debounce) {
      this.saveJournalDebounced(cleanedData);
    } else {
      return db.ref('journal/' + state.user.uid).update(cleanedData);
    }
  },
  saveJournalDebounced: debounce(function (data) {
    db.ref('journal/' + state.user.uid).update(data);
  }, debounceTime),
  archive: function () {
    if (!state.user) { return; }
    this.setNotification('Archiving the note...');
    const date = moment(state.journal.todayDate).format('YYYY-MM-DD');
    return db.ref(`dailyNotes/${state.user.uid}`).push({
      date: date,
      orderDesc: -moment(date).unix(),
      html: state.journal.today
    }).then(() => {
      return this.saveJournal({
        today: state.journal.todayTemplate,
        todayDate: this.getNewTodayDate()
      });
    }).then(() => {
      this.setNotification('Note archived.');
      mixpanel.track('daily-note:archived');
    }).catch(() => {
      this.errorNotification('Cannot archive the note.');
    });
  },
  saveNote: debounce(function (id, html) {
    if (!state.user) { return; }
    const note = find(state.dailyNotes, {id});
    if (note) {
      note.html = html;
    }
    return db.ref(`dailyNotes/${state.user.uid}/${id}`).update({html});
  }, debounceTime)
};
