import Firebase from 'firebase';
const googleProvider = new Firebase.auth.GoogleAuthProvider();
const twitterProvider = new Firebase.auth.TwitterAuthProvider();

export default function (app) {
  return {
    loginWithGoogle: function () {
      app.auth().signInWithPopup(googleProvider);
    },
    loginWithTwitter: function () {
      app.auth().signInWithRedirect(twitterProvider);
    },
    logout: function () {
      app.auth().signOut();
    },
    detectLoginStatus: function () {
      this.setLoading({user: true});
      app.auth().onAuthStateChanged(() => {
        this.setUser(app.auth().currentUser);
        this.loadJournal();
      });
    }
  };
};
