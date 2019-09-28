<template>
  <nav class="nav">
    <div class="nav-content">
      <a v-if="!isConnected" class="nav-logo" href="/">Daily Notes</a>
      <a v-else class="nav-logo" href="/#/journal">Daily Notes</a>

      <a class="hamburger" v-on:click.prevent="togglePrimaryMenu">
        <div v-if="!primaryMenuIsExpanded" class="menu icon"></div>
        <div v-else class="close icon"></div>
      </a>

      <ul class="nav-primary" v-bind:class="classes.primaryMenuExpanded">
        <li v-if="isConnected"><a href="/#/journal" class="nav-link-journal" v-bind:class="classes.journal">Journal</a></li>
        <li v-if="isConnected"><a href="/#/archives" class="nav-link-archives" v-bind:class="classes.archives">Archives</a></li>
        <li v-if="isConnected"><a href="/#/template" class="nav-link-template" v-bind:class="classes.template">Templates</a></li>
        <li v-if="isConnected" class="nav-primary-more">
          <a class="hamburger" v-on:click.prevent="toggleSecondaryMenu">
            <div v-if="!secondaryMenuIsExpanded" class="menu icon"></div>
            <div v-else class="close icon"></div>
          </a>
          <ul class="nav-secondary" v-bind:class="classes.secondaryMenuExpanded">
            <li><a target="_blank" href="https://twitter.com/usedailynotes/">Twitter</a></li>
            <li v-if="!isConnected"><a v-on:click.prevent="login" class="login">Log in</a></li>
            <li v-if="isConnected"><a href="https://docs.google.com/forms/d/1lIYA4PX51Kpd3SNJbExWdR5wndtWZ30aR9Y7UiHN8xA/edit" target="_blank">Give us Feedback</a></li>
            <li v-if="isConnected"><a v-on:click.prevent="logout" class="logout">Log out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import get from 'lodash/get';
import storeMixin from './mixins/store.js';

export default {
  mixins: [storeMixin],
  props: ['page', 'isConnected', 'userName', 'contributions'],
  data () {
    return {
      primaryMenuIsExpanded: false,
      secondaryMenuIsExpanded: false
    };
  },
  mounted () {
    document.addEventListener('click', this.handleClick, false);
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClick, false);
  },
  computed: {
    classes: function () {
      const route = get(this, '$route.fullPath', '');
      return {
        primaryMenuExpanded: {primaryMenuExpanded: this.primaryMenuIsExpanded},
        secondaryMenuExpanded: {secondaryMenuExpanded: this.secondaryMenuIsExpanded},
        journal: {active: route === '/journal'},
        template: {active: route === '/template'},
        archives: {active: route === '/archives'}
      };
    }
  },
  watch: {
    '$route': function () {
      this.hideMenus();
    }
  },
  methods: {
    togglePrimaryMenu: function () {
      this.primaryMenuIsExpanded = !this.primaryMenuIsExpanded;
    },
    toggleSecondaryMenu: function () {
      this.secondaryMenuIsExpanded = !this.secondaryMenuIsExpanded;
    },
    hideMenus: function () {
      this.primaryMenuIsExpanded = false;
      this.secondaryMenuIsExpanded = false;
    },
    handleClick: function (e) {
      const className = get(e, 'target.className', '');
      const parentClassName = get(e, 'target.parentNode.className', '');
      const isHamburger = typeof className === 'string' && (className.includes('hamburger') || parentClassName.includes('hamburger'));
      if (!isHamburger) {
        this.hideMenus();
      }
    },
    login: function () {
      this.store.login();
    },
    logout: function () {
      this.store.logout();
    }
  }
};
</script>


<style lang="less" scoped>
@import '../styles.less';

@navPadding: 14px;
.hamburger {
  display: none;
  height: 22px;
  width: 22px;
  padding: 9px;
  position: relative;
  .menu.icon {
    color: #000;
    position: absolute;
    margin-left: 2px;
    margin-top: 10px;
    width: 17px;
    height: 1px;
    background-color: currentColor;
  }
  .menu.icon:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 17px;
    height: 1px;
    background-color: currentColor;
  }
  .menu.icon:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    width: 17px;
    height: 1px;
    background-color: currentColor;
  }
  .close.icon {
    color: #000;
    position: absolute;
    margin-top: 0;
    margin-left: 0;
    width: 21px;
    height: 21px;
  }
  .close.icon:before {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
  }
  .close.icon:after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
}

.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: @navHeight;
  line-height:@navHeight;
  background: #FFF;
  z-index: 1;
  line-height:@navHeight - 1px;
  .box-shadow;
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-width: @max-width;
    margin: 0 auto;
    @media (max-width: @responsive-width) {
      padding: 0;
    }
    @media (min-width: @responsive-width) and (max-width: @max-width) {
      margin: 0 20px;
    }
  }
  &-logo {
    color: @color1;
    font-size: 20px;
    height: @navHeight;
    padding: 0 5px;
    display: block;
    float: left;
    &:hover, &:active, &:focus {
      text-decoration: none;
      color: darken(@color1, 30%);
    }
  }
  &-primary {
    list-style: none;
    margin: 0 0 0 160px;
    padding: 0;
    display: block;
    height: @navHeight;
    li {
      padding: 0;
      margin: 0;
      display: inline-block;
      position: relative;
      border-radius: 0;
      &.nav-primary-more {
        float: right;
        .hamburger {
          height: 22px;
          line-height: 22px;
          padding: 9px 10px;
        }
      }
      a {
        height: @navHeight;
        line-height: @navHeight;
        padding: 0 10px;
        margin: 0;
        display: block;
        color: @nav-color;
        font-size: 14px;
        &:hover, &.active, &.active:hover {
          color: @nav-color;
          text-decoration: none;
          background: @background;
        }
      }
      ul {
        display: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid @background;
      }
    }
  }
}
@media (min-width: @responsive-width) {
  .nav-secondary {
    display: none;
    position: absolute;
    top: @navHeight + 1;
    right: 0;
    background: #fff;
    margin: 0;
    padding: 0;
    .box-shadow;
    list-style: none;
    &.secondaryMenuExpanded {
      display: block;
      width: 170px;
    }
    li {
      padding: 0;
      margin: 0;
      display: block;
      a {
        color: @nav-color;
        display: block;
        padding: 0 20px;
        text-align: right;
        &:hover {
          background: @background;
        }
      }
    }
  }
}
@media (max-width: @responsive-width) {
  .hamburger {
    display: block;
    float: right;
  }
  .nav-primary {
    display: none;
    &.primaryMenuExpanded {
      display: block;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }
    background: #fff;
    position: absolute;
    top: @navHeight + 1;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
    float: none;
    height: auto;
    li {
      padding: 0;
      margin: 0;
      display: block;
    }
    li.nav-primary-more {
      float: none;
      > a {
        display: none;
      }
      ul {
        display: block;
      }
    }
  }
}
</style>
