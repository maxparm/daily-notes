export default function (state) {
  return {
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
    }
  };
};
