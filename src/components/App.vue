<template>
  <div>
    <template v-if="!isConnected">
      <loading v-if="isLoading"></loading>
      <homepage v-if="!isLoading"></homepage>
    </template>
    <template v-if="isConnected">
      <navigation :contributions="journal.contributions" :userName="userName" :isConnected="isConnected"></navigation>
      <router-view
        :user="user"
        :journal="journal"
        :journalTodayTemplate="journal.todayTemplate"
        :daily-notes="dailyNotes"
        :loading="isLoading"
        :now="now"
        :daily-notes-cursor="dailyNotesCursor"
      ></router-view>
      <notification :message="notificationMessage" :date="notificationDate"></notification>
      <Help :showHelp="journal.showHelp"></Help>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import visibility from 'visibilityjs';

import storeMixins from './mixins/store.js';
import Navigation from './Navigation.vue';
import Homepage from './Homepage.vue';
import Loading from './Loading.vue';
import Notification from './Notification.vue';
import Help from './Help.vue';

export default {
  mixins: [storeMixins],
  components: {Homepage, Navigation, Loading, Notification, Help},
  data () {
    return {
      version: null,
      user: null,
      notificationDate: null,
      notificationMessage: '',
      localLastUpdated: null,
      journal: {
        notepad: '',
        today: '',
        todayTemplate: ''
      },
      dailyNotes: [],
      now: moment().format(),
      dailyNotesCursor: null,
      loading: {
        user: true,
        history: false,
        journal: false
      }
    };
  },
  mounted () {
    this.store.initialize(this);
    this.store.detectLoginStatus();
    this.visibilityListerner = visibility.change((e, state) => {
      if (state === 'visible') {
        this.now = moment().format();
        this.store.checkLastUpdated();
        this.store.checkVersion();
      }
    });
    this.visibilityListernerTimer = visibility.every(30000, function () {
      this.now = moment().format();
    });
  },
  beforeDestroy () {
    visibility.unbind(this.visibilityListerner);
    visibility.unbind(this.visibilityListernerTimer);
  },
  computed: {
    isConnected: function () {
      return Boolean(this.user && this.user.uid);
    },
    isLoading: function () {
      return Boolean(this.loading.user || this.loading.journal || this.loading.history);
    },
    userName: function () {
      return this.user && this.user.displayName ? this.user.displayName : '';
    }
  }
};
</script>

<style lang="less">
@import '../styles.less';

</style>
