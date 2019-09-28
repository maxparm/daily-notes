<template>
<div class="template-selector-container">
  <div class="clearfix">
    <ul class="template-selector-list">
      <li v-for="dailyTemplate in dailyTemplates">
        <a v-bind:class="{'selected': selectedTemplate == dailyTemplate.id}" v-on:click.prevent="selectedTemplate = dailyTemplate.id">{{ dailyTemplate.title }}</a>
      </li>
    </ul>
    <div class="template-selector-preview" v-for="dailyTemplate in dailyTemplates">
      <div v-bind:class="{'displayed': selectedTemplate == dailyTemplate.id}">
        <div class="template-selector-preview-title">{{ dailyTemplate.title }}</div>
        <div class="template-selector-preview-description">{{ dailyTemplate.description }}</div>
        <div class="template-selector-preview-content">
          <quill-editor v-on:html-change="onChange" :html="dailyTemplate.html"></quill-editor>
        </div>
      </div>
    </div>
  </div>
  <div class="template-selector-try">
    <button v-on:click="clickTryTemplate">Try This Template</button>
  </div>
</div>
</template>

<script>
import storeMixin from './mixins/store.js';
import templatesStore from '../stores/templates.js';
import QuillEditor from './QuillEditor.vue';

export default {
  mixins: [storeMixin],
  components: {QuillEditor},
  data () {
    const templates = templatesStore();
    return {
      selectedTemplate: templates[0].id,
      dailyTemplates: templates,
      currentTemplate: templates[0].html
    };
  },
  methods: {
    onChange: function (html) {
      this.currentTemplate = html;
    },
    clickTryTemplate: function () {
      this.$emit('try-template', this.currentTemplate);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles.less';
@templateListWidth: 180px;
.template-selector {
  &-list {
    list-style: none;
    margin: 70px 0 0;
    padding: 0;
    width: @templateListWidth;
    float: left;
    li {
      padding: 0;
      margin: 0 0 10px 0;
      a {
        display: block;
        padding: 12px 20px 12px 0;
        text-align: center;
        border-radius: 8px;
        font-family: Avenir;
        font-size: 16px;
        letter-spacing: -0.3px;
        text-align: right;
        color: #8d9dbf;
        &:hover, &.selected {
          font-weight: 900;
          background-color: #f9fdff;
          color: #457b9d;
        }
      }
    }
    @media (max-width: @responsive-width) {
      float: none;
      margin: 40px 0 10px;
      width: 100%;
      text-align: center;
      li {
        display: inline-block;
        a {
          padding: 5px 10px;
          display: inline-block;
        }
      }
    }
  }
  &-preview {
    margin: 0 0 0 (@templateListWidth + 40);
    @media (max-width: @responsive-width) {
      margin: 0;
    }
    > div {
      display: none;
      &.displayed {
        display: block;
      }
    }
    &-title {
      font-family: Avenir;
      font-size: 21px;
      font-weight: 900;
      letter-spacing: -0.4px;
      text-align: center;
      color: #595d62;
      @media (max-width: @responsive-width) {
        display: none;
      }
    }
    &-description {
      font-size: 18px;
      line-height: 1.56;
      letter-spacing: 0.2px;
      text-align: center;
      color: #27334c;
      @media (max-width: @responsive-width) {
        display: none;
      }
    }
    &-content {
      margin: 15px 0 0;
      padding: 30px;
      padding: 0;
      box-shadow: 0 10px 19px 0 rgba(0, 0, 0, 0.08);
      border: solid 1px #a3d2f5;
      position: relative;
    }
  }
  &-try {
    padding: 50px 0 0 (@templateListWidth + 40);
    text-align: center;
    @media (max-width: @responsive-width) {
      padding: 20px 0 0;
    }
    button {
      border-radius: 9px;
      background-color: #fdffff;
      border: solid 1px #a3d2f5;
      padding: 3px 24px;
      font-family: Avenir;
      height: auto;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 1.2px;
      color: #457b9d;
    }
  }
}
</style>
