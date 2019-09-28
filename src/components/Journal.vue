<template>
  <div class="container component-journal">
    <loading v-if="loading"></loading>
    <template v-else>
      <div class="container-journal">
        <div class="header">
          <span
            class="header-name"
            v-bind:class="{'header-name--warning': isYesterdayDisplayed }"
          >{{ textualDate }}<strong v-if="isYesterdayDisplayed">outdated</strong></span>
          <a v-on:click.prevent="archive" v-if="isTodayDisplayed || isYesterdayDisplayed" class="btn pull-right journal-archive">Archive</a>
        </div>
        <quill-editor v-on:html-change="saveToday" :key="refreshId" :html="journal.today"></quill-editor>
      </div>

      <div class="container-notepad">
        <div class="header">
          <span class="header-name">Notepad</span>
        </div>
        <quill-editor v-on:html-change="saveNotepad" :html="journal.notepad"></quill-editor>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment';

import storeMixin from './mixins/store.js';
import QuillEditor from './QuillEditor.vue';
import Loading from './Loading.vue';

export default {
  mixins: [storeMixin],
  props: ['journal', 'now', 'loading'],
  components: {QuillEditor, Loading},
  data () {
    return {
      refreshId: Date.now(),
      isArchiving: false,
      showOverlay: true
    };
  },
  computed: {
    isTodayDisplayed: function () {
      return moment(this.now).isSame(this.journal.todayDate, 'day');
    },
    isYesterdayDisplayed: function () {
      return moment(this.now).isAfter(this.journal.todayDate, 'day');
    },
    textualDate: function () {
      const date = moment(this.journal.todayDate).format('LL');
      if (moment(this.journal.todayDate).isSame(moment(), 'day')) {
        return `Today`;
      }
      if (moment(this.journal.todayDate).isSame(moment().subtract(1, 'day'), 'day')) {
        return `Yesterday`;
      }
      if (moment(this.journal.todayDate).isSame(moment().add(1, 'day'), 'day')) {
        return `Tomorrow`;
      }
      return date;
    }
  },
  methods: {
    saveToday: function (html) {
      this.store.saveJournal({today: html}, {debounce: true});
    },
    saveNotepad: function (html) {
      this.store.saveJournal({notepad: html}, {debounce: true});
    },
    refreshEditor: function () {
      this.refreshId = Date.now();
    },
    archive: function () {
      this.isArchiving = true;
      this.store.archive().then(() => {
        this.isArchiving = false;
        this.refreshEditor();
      }).catch(() => {
        this.isArchiving = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles.less';

.container {
  &-journal {
    float: left;
    width: 49%;
    display: block;
    &--shown {
      display: block;
    }
  }
  &-notepad {
    float: left;
    width: 49%;
    margin-left: 2%;
  }
  @media (max-width: @responsive-width) {
    &-journal, &-notepad {
      float: none;
      width: 100%;
      margin: 0 0 20px;
    }
  }
}
</style>
