<template>
  <div class="notification">{{ notificationMessage }}</div>
</template>

<script>
export default {
  props: ['message', 'date'],
  data () {
    return {
      notificationMessage: this.message,
      hidingDelay: 10000
    };
  },
  beforeDestroy () {
    clearTimeout(this.st);
  },
  watch: {
    date: function () {
      this.notificationMessage = this.message;
      this.hideAutomaticallyNotification();
    }
  },
  methods: {
    hideAutomaticallyNotification: function () {
      clearTimeout(this.st);
      this.st = setTimeout(() => {
        this.notificationMessage = '';
      }, this.hidingDelay);
    }
  }
};
</script>


<style lang="less" scoped>
@color: #FFF6D5;
.notification {
  z-index: 2;
  top: 30px;
  left: 50%;
  position: absolute;
  font-size: 13px;
  text-align: center;
  box-shadow: 0 0 4px darken(@color, 85%);
  background: @color;
  transform: translateX(-50%);
  color: darken(@color, 80%);
  padding: 1px 7px;
  display: inline-block;
  &:empty {
    display: none !important;
  }
}
</style>
