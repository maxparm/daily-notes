import ga from 'vue-ga';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import App from './components/App.vue';
import Journal from './components/Journal.vue';
import Archives from './components/Archives.vue';
import Template from './components/Template.vue';
import All from './components/All.vue';

// Router
Vue.use(VueRouter);
const routes = [
  {path: '/', component: Journal},
  {path: '/journal', component: Journal},
  {path: '/archives', component: Archives},
  {path: '/template', component: Template},
  {path: '/all', component: All}
];
const router = new VueRouter({routes});

if (process.env.NODE_ENV !== 'development') {
  // Google Analytics
  ga(router, 'UA-1091130-19');

  // Raven JS
  Raven.config('https://023a6ffe5f2f4d9a976ccee5958ac0c0@sentry.io/141871')
    .addPlugin(RavenVue, Vue)
    .install();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
