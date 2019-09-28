<template>
  <div class="container component-template">
    <loading v-if="loading"></loading>
    <template v-else>
      <div class="container-list template-list">
        <ul v-if="templates">
          <li v-for="template in templates">
            <a
              v-if="template.type !== 'separator'"
              v-bind:class="{selected: (templateShown && template.id === templateShown.id)}"
              v-on:click.prevent="showTemplate(template)"
            >{{ template.title }}</a>
            <span v-else>Examples</span>
          </li>
        </ul>
      </div>
      <div class="container-editor" v-if="templateShown">
        <div class="header">
          <span class="header-name">{{ templateShown.title }}</span>
          <a v-on:click.prevent="useTemplate(templateShown)" v-if="templateShown.type === 'example'" class="btn pull-right">Use Template</a>
        </div>
        <quill-editor
          v-on:html-change="saveTodayTemplate"
          :key="templateShown.id"
          :html="templateShown.html"
          :readOnly="templateShown.readOnly"
        ></quill-editor>
      </div>
    </template>
  </div>
</template>

<script>
import storeMixin from './mixins/store.js';
import templatesStore from '../stores/templates.js';
import QuillEditor from './QuillEditor.vue';
import TemplateSelector from './TemplateSelector.vue';
import Loading from './Loading.vue';

export default {
  mixins: [storeMixin],
  props: ['journalTodayTemplate', 'journal', 'loading'],
  components: {QuillEditor, Loading, TemplateSelector},
  data () {
    return {templateShown: this.getUserTemplate()};
  },
  computed: {
    templates: function () {
      const separator = {type: 'separator'};
      const templates = templatesStore().map(t => Object.assign(t, {type: 'example', readOnly: true}));
      return [].concat(this.getUserTemplate(), separator, templates);
    }
  },
  watch: {
    'journal.todayTemplate': function () {
      this.templateShown = this.getUserTemplate();
    }
  },
  methods: {
    getUserTemplate: function () {
      return {id: 'user', type: 'user', readOnly: false, title: 'Your Template', html: this.journal.todayTemplate};
    },
    saveTodayTemplate: function (html) {
      this.store.saveJournal({todayTemplate: html}, {debounce: true});
    },
    useTemplate: function (templateShown) {
      this.store.saveJournal({todayTemplate: templateShown.html}).then(() => {
        this.store.setNotification('Your daily template has been updated.');
      }).catch(() => {
        this.store.errorNotification('Cannot change your daily template.');
      });
    },
    showTemplate: function (template) {
      this.templateShown = template;
    }
  }
};
</script>

<style lang="less">
@import '../styles.less';
@template-width: 240px;

.template-list {
  ul {
    // border: 1px solid @border-color-darker;
    .box-shadow--light;
    list-style: none;
    padding: 0;
    margin: (@columnHeaderHeight + 5px) 0 0;
    li {
      margin: 0;
      padding: 0;
      border-bottom: 1px solid @border-color-darker;
      a {
        background: white;
        display: block;
        padding: 10px 15px;
        &:hover {
          background: @background-hover;
        }
        &.selected {
          font-weight: bold;
          color: @color2-hover;
          background: @background-selected;
        }
      }
      &:last-child {
        border-bottom: 0;
      }
      span {
        display: block;
        font-size: 11px;
        color: @color-meta;
        padding: 3px 15px;
      }
    }
  }
}


.container {
  &-list {
    width: @template-width;
    float: left;
  }
  &-editor {
    margin-left: @template-width + 20px;
    display: block;
  }
  @media (max-width: @responsive-width) {
    &-list {
      display: none;
    }
    &-editor {
      margin-left: 0;
    }
  }
}
</style>
