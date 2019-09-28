/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

document.title = "[DEV] Daily Notes";
const icons = document.querySelectorAll("link[rel*='icon']").forEach((el) => {
  el.href = '/static/img/favicon/dev.png';
});

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
