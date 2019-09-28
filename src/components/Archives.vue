<template>
  <div class="container component-archives">
    <loading v-if="loading"></loading>
    <div v-if="!loading" class="container-calendar" v-bind:class="{'container-calendar--shown': calendarShown}">
      <div class="header" align="center">
        <a class="pull-left calendar__cursor" v-on:click.prevent="goToPreviousMonth">&laquo;</a>
        <a class="pull-right calendar__cursor" v-on:click.prevent="goToNextMonth" v-if="showFuture">&raquo;</a>
        <div class="calendar__date">{{dateFormatted}}</div>
      </div>
      <table width="100%" class="calendar">
        <tr>
          <th width="14.2%" align="center">Mon</th>
          <th width="14.2%" align="center">Tue</th>
          <th width="14.2%" align="center">Wed</th>
          <th width="14.2%" align="center">Thu</th>
          <th width="14.2%" align="center">Fri</th>
          <th width="14.2%" align="center">Sat</th>
          <th width="14.2%" align="center">Sun</th>
        </tr>
        <tr v-for="week in calendar">
          <td width="14.2%" v-for="day in week">
            <template v-if="day">
              <a v-if="day.words" v-on:click.prevent="noteShown = day.note" v-bind:class="{'selected': (day && day.isSelected)}">
                {{ day.date }}
                <span>{{ day.words }} words</span>
              </a>
              <div v-else>
                {{ day.date }}
                <span>0 words</span>
              </div>
            </template>
          </td>
        </tr>
      </table>
    </div>

    <div v-if="!loading" class="container-archive">
      <div v-if="noteShown">
        <div class="header">
          <a class="btn pull-right calendar__toggle-button" v-on:click.prevent="toggleCalendar">Show Calendar</a>
          <span class="header-name">{{ noteShown.dateFormatted }}</span>
        </div>
        <quill-editor v-on:html-change="saveNote" :key="noteShown.id" :html="noteShown.html"></quill-editor>
      </div>
      <div v-else class="loading">No archive selected...</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import wordcount from 'wordcount';
import find from 'lodash/find';
import storeMixin from './mixins/store.js';
import QuillEditor from './QuillEditor.vue';
import Loading from './Loading.vue';

const htmlToText = function (html) {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export default {
  mixins: [storeMixin],
  props: ['dailyNotes', 'loading'],
  components: {QuillEditor, Loading},
  mounted () {
    this.loadArchives();
  },
  data () {
    return {
      calendarShown: false,
      noteShown: false,
      date: moment().startOf('month').format('YYYY-MM-DD')
    };
  },
  computed: {
    showFuture: function () {
      return moment(this.date, 'YYYY-MM-DD').isBefore(moment(), 'month');
    },
    dateFormatted: function () {
      return moment(this.date, 'YYYY-MM-DD').format('MMMM YYYY');
    },
    calendar: function () {
      const days = [[]];
      let week = 0;
      const start = moment(this.date).startOf('month').startOf('isoweek');
      const end = moment(this.date).endOf('month').endOf('isoweek');
      while (!start.isAfter(end, 'day')) {
        if (!days[week]) {
          days[week] = [];
        }
        if (start.isSame(this.date, 'month')) {
          const dailyNote = find(this.dailyNotes, (note) => {
            return start.isSame(note.date, 'day');
          });
          const words = dailyNote ? wordcount(htmlToText(dailyNote.html)) : 0;
          const isNoteShown = (dailyNote && this.noteShown && dailyNote.id === this.noteShown.id);
          days[week].push({date: start.format('D'), words: words, note: dailyNote, isSelected: isNoteShown});
        } else {
          days[week].push(null);
        }
        if (!start.day()) {
          week += 1;
        }
        start.add(1, 'day');
      }
      return days;
    }
  },
  methods: {
    goToPreviousMonth: function () {
      this.date = moment(this.date, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD');
      this.loadArchives();
    },
    goToNextMonth: function () {
      this.date = moment(this.date, 'YYYY-MM-DD').add(1, 'month').format('YYYY-MM-DD');
      this.loadArchives();
    },
    loadArchives: function () {
      this.noteShown = false;
      this.store.getArchives(this.date).then(() => {
        this.pickFirstNoteIfNoneSelected();
      });
    },
    toggleCalendar: function () {
      this.calendarShown = !this.calendarShown;
    },
    pickFirstNoteIfNoneSelected: function () {
      if (this.dailyNotes.length) {
        if (moment(this.date).isSame(moment(), 'month')) {
          this.noteShown = this.dailyNotes[0];
        } else {
          this.noteShown = this.dailyNotes[this.dailyNotes.length - 1];
        }
      }
    },
    loadMoreHistory: function () {
      if (this.dailyNotes.length) {
        const paginate = true;
        this.store.getArchives(this.date, paginate);
      }
    },
    saveNote: function (html) {
      if (this.noteShown) {
        this.store.saveNote(this.noteShown.id, html);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles.less';

.container {
  &-calendar {
    float: left;
    width: 49%;
    display: block;
    &--shown {
      display: block;
    }
  }
  &-archive {
    float: left;
    width: 49%;
    margin-left: 2%;
  }
  @media (max-width: @responsive-width) {
    &-calendar, &-archive {
      float: none;
      width: 100%;
      margin: 0;
    }
    &-calendar {
      display: none;
      &--shown {
        display: block;
      }
    }
  }
}


.calendar {
  &__cursor {
    font-size: 18px;
    display: block;
    padding: 0 10px;
    background: white;
    border: 1px solid darken(@background, 10%);
    border-radius: 3px;
    font-size: 30px;
    line-height: 19px;
    height: 25px;
  }
  &__date {
    font-size: 18px;
    margin: 0 0 10px;
  }
  &__toggle-button {
    display: none;
    @media (max-width: @responsive-width) {
      display: block;
    }
  }
}
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  td, th {
    border: 1px solid darken(@background, 10%);
    background: white;
    text-align: center;
    padding: 0;
    span {
      padding: 0 2px;
      display: block;
      font-size: 9px;
    }
    a, div {
      display: block;
      padding: 4px 0;
      border: 1px solid transparent;
    }
    a {
      font-weight: bold;
      background: @background-success;
      &.selected {
        border: 1px solid @color2;
      }
    }
  }
  th {
    padding: 4px 0;
  }
  td {
    color: @color-meta;
  }
}
</style>
