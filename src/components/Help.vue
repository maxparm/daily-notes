<template>
  <div class="help-background" v-if="showHelp">
    <div class="help-container">
      <carousel :perPage="1">
        <slide>
          <div class="help-content help-content-1">
            <img src="static/img/help-1.png" />
            <div>
              <h1>Your daily note on the left</h1>
              Gather notes, links, thoughts, goal updates... about your day.
            </div>
          </div>
        </slide>
        <slide>
          <div class="help-content help-content-3">
            <img src="static/img/help-3.png" />
            <div>
              <h1>Done? Archive!</h1>
              Archive your daily note and access it later from the archives.
            </div>
          </div>
        </slide>
        <slide>
          <div class="help-content help-content-4">
            <img src="static/img/help-4.png" />
            <div>
              <h1>Be consistent with a template</h1>
              Build and respect your worflow and process using a template for your daily note.
            </div>
          </div>
        </slide>
        <slide>
          <div class="help-content help-content-2">
            <img src="static/img/help-2.png" />
            <div>
              <h1>A notepad for your long term notes</h1>
              Those are here to stay! Use them at your convenience.
            </div>
          </div>
        </slide>
        <slide>
          <div class="help-content help-content-ready">
            <h1>Ready?!?</h1>
            <a class="btn btn-large" v-on:click.prevent="start">Start Journaling!</a>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import storeMixin from './mixins/store.js';

export default {
  mixins: [storeMixin],
  props: ['showHelp'],
  components: {Carousel, Slide},
  methods: {
    start: function () {
      this.store.hideHelp();
    }
  }
};
</script>


<style lang="less" scoped>
@import '../styles.less';
.help-background {
  z-index: @z-index-help;
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.help-container {
  z-index: @z-index-help + 1;
  top: 50%;
  left: 50%;
  position: absolute;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  text-align: center;
  padding: 20px;
  width: 369px;
  @media (max-width: @responsive-width) {
    transform: translate(0, -50%);
    left: 10px;
    right: 10px;
    padding: 0;
    background: red;
  }
  h1 {
    font-size: 24px;
    padding: 0;
    margin: 0 0 10px;
  }
}
.help-content {
  div {
    padding: 0 20px;
  }
  img {
    display: block;
    width: 369px;
    height: 297px;
    margin-bottom: 30px;
    @media (max-width: @responsive-width) {
      width: 100%;
      height: 100%;
    }
  }
}
.help-content-ready {
  padding: 120px 0;
}
</style>
