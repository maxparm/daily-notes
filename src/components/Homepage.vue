<template>
  <div class="homepage-container">
    <div class="homepage-login-background" v-if="showLogin">
      <div class="homepage-login-container">
        <h1>Login</h1>
        <a class="homepage-login-button homepage-login-button--google" v-on:click.prevent="loginWithGoogle"></a>
        <a class="homepage-login-button homepage-login-button--twitter" v-on:click.prevent="loginWithTwitter">Continue with Twitter</a>
        <a class="homepage-login-close" v-on:click.prevent="closeLogin">close</a>
      </div>
    </div>


    <a class="pull-right login" v-on:click.prevent="login">LOGIN</a>
    <div class="header-logo"><img src="static/img/dn-logo.svg" />Daily Notes</div>
    <div class="header-title">Know How Each Day Will Unfold.</div>
    <div class="header-headline">A Flexible Digital Journal With Templates</div>
    <div class="header-start-journaling-container">
      <a class="header-start-journaling" v-on:click.prevent="login">START JOURNALING NOW</a>
    </div>


    <div class="screenshot">
      <div class="screenshot-plant"></div>
      <div class="screenshot-pens"></div>
      <div class="screenshot-desk">
        <img src="/static/img/dn-footer-macbook-2x.png" class="screenshot-computer"/>
      </div>
    </div>


    <div class="section-name section-name--mobile">Your Personal Development Journey Starts Now</div>
    <div class="section-description section-description--mobile">Start with a blank slate, or use one of these proven daily journal templates below:</div>
    <div class="template-container">
      <template-selector v-on:try-template="loginWithTemplate"></template-selector>
    </div>


    <div class="section-name">How To Use Daily Notes</div>
    <div class="how-to-container">
      <div class="how-to-content clearfix">
        <div class="how-to-title pull-right">1. Plan Your Day</div>
        <img class="how-to-img pull-left how-to-img-1" src="/static/img/dn-how-to-1.png" />
      </div>
      <div class="how-to-content clearfix">
        <div class="how-to-title pull-left">2. Document Notes + Memories</div>
        <img class="how-to-img pull-right how-to-img-2" src="/static/img/dn-how-to-2.png" />
      </div>
      <div class="how-to-content clearfix">
        <div class="how-to-title pull-right">3. Reflect. Increase Self-Awareness</div>
        <img class="how-to-img pull-left how-to-img-3" src="/static/img/dn-how-to-3.png" />
      </div>
    </div>

    <div class="row clearfix">
      <div class="row-cell">
        <div class="row-cell-tweet">
          <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">No matter how big or small an idea is, get it in writing. Note taking can shape the future of your business: <a href="http://t.co/inN1tRWOS8">http://t.co/inN1tRWOS8</a></p>&mdash; Richard Branson (@richardbranson) <a href="https://twitter.com/richardbranson/status/565925873061466112">February 12, 2015</a></blockquote>
        </div>
      </div>
      <div class="row-cell">
        <div class="row-cell-tweet">
          <blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Take a Load Off: The Missing Key to Productivity Is Reflection - <a href="https://t.co/M3aIehOtNT">https://t.co/M3aIehOtNT</a></p>&mdash; Jocelyn K. Glei (@jkglei) <a href="https://twitter.com/jkglei/status/811310436985540608">December 20, 2016</a></blockquote>
        </div>
      </div>
    </div>


    <div class="section-name section-name--mobile-hide">Daily Notes let's you Create a Digital journal that Fits Your Life, Schedule, and Journaling Style.</div>
    <div class="row clearfix">
      <div class="row-cell">
        <img class="feature-img" width="39" height="52" src="static/img/homepage-feature-template.png" />
        <div class="feature-name">Template</div>
        <div class="feature-description">Customize your template and start every day right with your ideal journal.</div>
      </div>
      <div class="row-cell">
        <img class="feature-img" width="62" height="51" src="static/img/homepage-feature-track.png" />
        <div class="feature-name">Stay on Track</div>
        <div class="feature-description">Use checkbox to keep track of your tasks, habits or long terms goals.</div>
      </div>
    </div>
    <div class="row clearfix">
      <div class="row-cell">
        <img class="feature-img" width="65" height="37" src="static/img/homepage-feature-archive.png" />
        <div class="feature-name">View your Progress</div>
        <div class="feature-description">Go back in time in the Archives and see what you were doing in the previous days.</div>
      </div>
      <div class="row-cell">
        <img class="feature-img" width="53" height="46" src="static/img/homepage-feature-notepad.png" />
        <div class="feature-name">Notepad</div>
        <div class="feature-description">Keep long your term notes visible as your journal for each day.</div>
      </div>
    </div>


    <div class="footer">
      <div class="footer-container">
        <div class="footer-example"></div>
        <div class="footer-title">Ready To Start Journaling Your Day?</div>
        <a class="footer-start" v-on:click.prevent="login">TRY NOW IT’S FREE</a>
        <div class="footer-questions">Have Question or Feedback?</div>
        <div class="footer-contact">Email Us at support@dailynotes.com</div>
      </div>
    </div>
  </div>
</template>

<script>
import storeMixin from './mixins/store.js';
import QuillEditor from './QuillEditor.vue';
import TemplateSelector from './TemplateSelector.vue';

export default {
  mixins: [storeMixin],
  components: {QuillEditor, TemplateSelector},
  data () {
    return {
      selectedTemplate: 'gratitude',
      showLogin: false
    };
  },
  mounted () {
    console.log(this);
  //   this.store.detectRedirectLogin();
  },
  methods: {
    login: function () {
      this.showLogin = true;
    },
    closeLogin: function () {
      this.showLogin = false;
    },
    loginWithGoogle: function () {
      this.store.loginWithGoogle();
    },
    loginWithTwitter: function () {
      this.store.loginWithTwitter();
    },
    loginWithTemplate: function (html) {
      this.store.updateDefaultTodayTemplate(html);
      this.login();
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles.less';
.homepage-container {
  font-family: Avenir;
  background: #fff;
}
.homepage-login {
  &-background {
    z-index: @z-index-help;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-container {
    z-index: @z-index-help + 1;
    top: 50%;
    left: 50%;
    position: absolute;
    background: white;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    text-align: center;
    padding: 20px;
    width: 300px;
    @media (max-width: @responsive-width) {
      transform: translate(0, -50%);
      left: 10px;
      right: 10px;
      padding: 0;
    }
    h1 {
      font-size: 24px;
      padding: 0;
      margin: 0 0 10px;
    }
  }
  &-button {
    margin: 20px auto;
    display: block;
    color: white;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    color: white;
    &:hover {
      color: white;
    }
    &--facebook {
      border-radius: 3px;
      padding: 1px 0 1px 55px;
      height: 38px;
      line-height: 38px;
      background: #4267b2 url('/static/img/fb.png') 1px 1px no-repeat;
      background-size: 38px;
      width: 190px;
    }
    &--twitter {
      &:before {
        position: absolute;
        left: 1px;
        background: #fff url('/static/img/twitter.png') 1px 1px no-repeat;
        background-size: 38px;
        border-radius: 1px;
        display: block;
        content: '';
        height: 38px;
        width: 38px;
      }
      position: relative;
      border-radius: 3px;
      padding: 1px 0 1px 55px;
      height: 38px;
      line-height: 38px;
      background: #1da1f2;
      background-size: 38px;
      width: 170px;
    }
    &--google {
      &:before {
        content: '';
      }
      background: url('/static/img/google-login.png') 0 0 no-repeat;
      width: 191px;
      height: 46px;
      background-size: 100%;
    }
  }
  &-close {
    color: @color-meta;
    margin: 40px 0 0;
  }
}

.header {
  &-logo {
    padding: 50px 0 0;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.1px;
    text-align: center;
    color: #39434d;
    img {
      display: block;
      margin: 0 auto 5px;
      width: 30px;
      height: 18px;
    }
    @media (max-width: @responsive-width) {
      padding: 20px 0 0 20px;
      text-align: left;
      img {
        float: left;
        margin: 4px 10px 0 0;
      }
    }
  }
  &-title {
    margin: 80px 20px 0;
    font-size: 45px;
    font-weight: 900;
    letter-spacing: -0.9px;
    text-align: center;
    color: #27334c;
    @media (max-width: @responsive-width) {
      font-size: 34px;
      letter-spacing: -0.6px;
      margin: 30px 20px 10px;
    }
  }
  &-headline {
    margin: 0 20px;
    font-family: Avenir-Book;
    font-size: 26px;
    letter-spacing: -0.5px;
    text-align: center;
    color: #27334c;
    @media (max-width: @responsive-width) {
      font-size: 16px;
    }
  }

  &-start-journaling {
    &-container {
      text-align: center;
    }
    display: inline-block;
    text-align: center;
    margin: 50px auto 0;
    border-radius: 9px;
    padding: 12px 26px;
    font-family: Avenir;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: #ffffff;
    border-radius: 9px;
    background-color: #457b9d;
    &:hover {
      color: #fff;
      background-color: darken(#457b9d, 10%);
    }
  }
}


.screenshot {
  overflow: hidden;
  position: relative;
  z-index: 0;
  &-plant {
    position: absolute;
    right: 50%;
    bottom: 80px;
    margin-right: 420px;
    background: url('/static/img/dn-plant.png') no-repeat;
    display: block;
    width: 287px;
    height: 287px;
    background-size: 100%;
    z-index: -1;
    @media (max-width: @responsive-width) {
      display: none;
    }
  }
  &-pens {
    position: absolute;
    left: 50%;
    bottom: 80px;
    margin-left: 320px;
    background: url('/static/img/dn-pens.png') no-repeat;
    display: block;
    width: 295px;
    height: 250px;
    z-index: -1;
    background-size: 100%;
    @media (max-width: @responsive-width) {
      display: none;
    }
  }
  &-desk {
    z-index: 2;
    padding: 60px 0;
    background: transparent;
    background: -moz-linear-gradient(top, transparent 630px, #f8fbff 630px, #ffffff 100%);
    background: -webkit-linear-gradient(top, transparent 630px,#f8fbff 630px,#ffffff 100%);
    background: linear-gradient(to bottom, transparent 630px,#f8fbff 630px, #ffffff 100%);
  }
  &-computer {
    z-index: 3;
    display: block;
    width: 1100px;
    height: 634px;
    margin: 0 auto;
    @media (max-width: @responsive-width) {
      width: 100%;
      height: auto;
    }
  }

}

.how-to {
  &-container {
    margin: 50px auto 100px;
    width: @responsive-width;
    @media (max-width: @responsive-width) {
      width: auto;
      margin: 0 20px;
    }
  }
  &-content {
    padding: 100px 0 0;
    @media (max-width: @responsive-width) {
      padding: 0;
    }
  }
  &-img {
    display: block;
    &:before {
      content: '';
    }
    &-1 {
      width: 477px;
      height: 361px;
      @media (max-width: @responsive-width) {
        width: 100%;
        height: 100%;
      }
    }
    &-2 {
      background-size: 100%;
      width: 425px;
      height: 375px;
      @media (max-width: @responsive-width) {
        width: 100%;
        height: 100%;
      }
    }
    &-3 {
      background: url('/static/img/dn-how-to-3.png') no-repeat 0 0;
      background-size: 100%;
      width: 459px;
      height: 333px;
      @media (max-width: @responsive-width) {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-title {
    padding: 120px 0 0;
    font-family: Avenir-Book;
    font-size: 27px;
    display: block;
    &.pull-left {
      width: 250px;
    }
    &.pull-right {
      text-align: right;
      width: 240px;
    }
    @media (max-width: @responsive-width) {
      &.pull-left, &.pull-right {
        padding: 50px 0 20px;
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
  }
}


.template-container {
  margin: 50px auto 100px;
  width: @responsive-width;
  @media (max-width: @responsive-width) {
    width: 100%;
    margin: 40px 0;
  }
}


.footer {
  margin-top: 240px;
  background: #457b9d;
  padding: 60px 0 60px 40%;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 300;
  position: relative;
  @media (max-width: @responsive-width) {
    margin-top: 40px;
    padding: 30px 20px;
    text-align: center;
  }
  &-example {
    content: '';
    display: block;
    width: 673px;
    height: 388px;
    position: absolute;
    bottom: 60px;
    right: 70%;
    background: url('/static/img/dn-footer-macbook-2x.png') top right no-repeat;
    background-size: 100%;
    @media (max-width: @responsive-width) {
      display: none;
    }
  }
  &-title {
    font-family: Avenir-Book;
    font-size: 30px;
    line-height: 1.73;
    letter-spacing: -0.6px;
    color: #ffffff;
    @media (max-width: @responsive-width) {
      font-family: Avenir-Book;
      font-size: 20px;
    }
  }
  &-start {
    margin-top: 20px;
    display: inline-block;
    background: #fff;
    font-family: Avenir;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 1.2px;
    border-radius: 9px;
    padding: 12px 26px;
    color: #3380b9;
  }
  &-questions {
    margin-top: 60px;
    color: #b6c9ec;
  }
  &-contact {
    color: #ffffff;
    a {
      color: #ffffff;
    }

  }
}

.row {
  margin: 0 auto;
  width: @responsive-width;
  @media (max-width: @responsive-width) {
    margin: 0 20px;
    width: auto;
  }
  &-cell {
    width: 50%;
    float: left;
    @media (max-width: @responsive-width) {
      float: none;
      width: 100%;
    }
    &-tweet {
      padding: 0 10px;
    }
  }
}

.feature {
  &-name {
    margin: 0;
    padding: 0 20px;
    font-size: 21px;
    font-weight: 900;
    line-height: 1.33;
    letter-spacing: 0.3px;
    text-align: center;
    color: #27334c;
  }
  &-description {
    padding: 0 20px;
    margin: 20px 0 0;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.56;
    letter-spacing: 0.2px;
    text-align: center;
    color: #27334c;
    @media (max-width: @responsive-width) {
      margin: 5px 0 0;
    }
  }
  &-img {
    display: block;
    margin: 60px auto 20px;
    @media (max-width: @responsive-width) {
      margin: 40px auto 20px;
    }
  }
}

.section-name {
  width: @responsive-width;
  margin: 100px auto 0;
  font-family: Avenir-Book;
  font-size: 30px;
  line-height: 1.73;
  letter-spacing: -0.6px;
  text-align: center;
  color: #27334c;
  @media (max-width: @responsive-width) {
    line-height: 1.4;
    width: auto;
    margin: 40px 20px 10px;
    font-size: 20px;
    &--mobile {
      font-size: 30px;
      font-weight: 900;
      color: #27334c;
      &-hide {
        display: none;
      }
    }
  }
}
.section-description {
  margin: 0 auto;
  width: @responsive-width;
  font-family: Avenir-Roman;
  font-size: 19px;
  line-height: 1.47;
  letter-spacing: 0.2px;
  text-align: center;
  color: #a3d2f5;
  &--mobile {
    @media (max-width: @responsive-width) {
      margin: 0 20px;
      width: auto;
      font-family: Avenir-Book;
      letter-spacing: -0.3px;
      text-align: center;
      color: #27334c;
    }
  }
}

.login {
  position: absolute;
  top: 50px;
  right: 20px;
  font-family: Avenir;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.2px;
  padding: 5px 10px;
  color: #457b9d;
  border-radius: 3px;
  &:hover {
    color: darken(#457b9d, 15%);
    background: #f5f5f5;
  }
  @media (max-width: @responsive-width) {
    top: 24px;
  }
}
</style>
