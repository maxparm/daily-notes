<template>
  <div class="editor quill-editor-container" v-bind:class="{'quill-editor-container-read-only': readOnly}">
    <div class="quill-editor-content"><slot></slot></div>
  </div>
</template>

<script>
import Quill from 'quill';
import Delta from 'quill-delta';
import storeMixin from './mixins/store.js';

Quill.import('ui/icons')['unchecked'] = `
  <svg class="" viewbox="0 0 18 18">
    <line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"></line>
    <polyline class="ql-stroke" points="3 4 4 5 6 3"></polyline>
    <line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"></line>
    <polyline class="ql-stroke" points="3 14 4 15 6 13"></polyline>
    <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
    <polyline class="ql-stroke" points="3 9 4 10 6 8"></polyline>
  </svg>
`;

export default {
  mixins: [storeMixin],
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    html: {
      type: String,
      required: true,
      default: ''
    }
  },
  beforeDestroy () {
    this.quill.off();
    delete this.quill;
  },
  data () {
    return {localHtml: ''};
  },
  mounted () {
    const toolbarOptions = {
      container: (this.readOnly ? [] : [
        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'link'],
        ['image', 'video'],
        ['clean']
      ]),
      handlers: {
        image: () => {
          let fileInput = this.quill.container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
              if (fileInput.files != null && fileInput.files[0] != null) {
                this.store.uploadImageHandler(fileInput.files[0], (url) => {
                  let range = this.quill.getSelection(true);
                  this.quill.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({image: url})
                  , 'user');
                  fileInput.value = '';
                });
              }
            });
            this.quill.container.appendChild(fileInput);
          }
          fileInput.click();
        }
      }
    };
    const editorEl = this.$el.querySelector('.quill-editor-content');
    this.quill = new Quill(editorEl, {
      theme: 'snow',
      bounds: editorEl,
      readOnly: this.readOnly,
      placeholder: 'Write your notes...',
      modules: {toolbar: toolbarOptions}
    });
    this.quill.clipboard.dangerouslyPasteHTML(this.html);
    this.quill.on('text-change', (diff, ops, source) => {
      this.localHtml = this.quill.root.innerHTML;
      this.$emit('html-change', this.localHtml);
    });
  // },
  // watch: {
  //   html: function (newVal, oldVal) {
  //     if (this.quill) {
  //       if (!!newVal && newVal !== this.localHtml) {
  //         this.localHtml = newVal;
  //         this.quill.pasteHTML(newVal);
  //       } else if (!newVal) {
  //         this.quill.setText('');
  //       }
  //     }
  //   }
  }
};
</script>

<style lang="less">
@import '../styles.less';

.ql-snow {
  border: none;
}
.ql-container.ql-snow, .ql-toolbar.ql-snow {
  border: 0;
}
.ql-snow.ql-toolbar {
  padding: 0 10px;
  line-height: 32px;
  height: 34px;
  background: @background-toolbar;
  border-bottom: 1px solid @border-color;
  .quill-editor-container-read-only & {
    display: none;
  }
  button {
    padding: 0;
    width: 16px;
    height: 16px;
  }
  .ql-formats {
    margin-right: 10px;
  }
}
.quill-editor-content {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
}
.editor {
  background: #fff;
  height: auto;
  .box-shadow--light;
  .quill-editor-container-read-only & {
    top: 0;
  }
  input.ql-image {
    display: none;
  }
  .ql-editor {
    font-size: 14px;
    color: #333;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    // -webkit-overflow-scrolling: touch;
    *:first-child {
      margin-top: 0;
    }
    h1 {
      font-size: 1.4em;
    }
    h2 {
      font-size: 1.2em;
    }
    h1, h2 {
      color: #000;
      margin-top: 1em;
      margin-bottom: 0.2em;
    }
    h1 + h2 {
      margin-top: 0em;
    }
    blockquote {
      font-size: 14px;
    }
    ul, ol {
      padding-left: 0;
      li {
        line-height: 20px;
      }
      li:before {
        text-align: center;
      }
      li.ql-indent-1 {
        padding-left: 2.7em;
      }
      li.ql-indent-2 {
        padding-left: 3.9em;
      }
      li.ql-indent-3 {
        padding-left: 5.1em;
      }
      li.ql-indent-4 {
        padding-left: 6.3em;
      }
      li.ql-indent-5 {
        padding-left: 7.5em;
      }
      li.ql-indent-6 {
        padding-left: 8.7em;
      }
      li.ql-indent-7 {
        padding-left: 9.9em;
      }
      li.ql-indent-8 {
        padding-left: 11.1em;
      }
    }
    ul[data-checked=true], ul[data-checked=false] {
      pointer-events: none;
      > li {
        position: relative;
        &:before {
          border: 1px solid lighten(@color-meta, 10%);
          position: absolute;
          color: @color-meta;
          border-radius: 2px;
          content: "";
          height: 13px;
          width: 13px;
          line-height: 13px;
          top: 3px;
          text-align: center;
          vertical-align: middle;
          pointer-events: all;
        }
      }
    }
    ul[data-checked=true] > li {
      font-style: italic;
      color: @grey;
      &:before {
        content: "✔";
      }
    }
  }
}

</style>
