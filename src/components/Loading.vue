<template>
  <div class="loading" v-bind:class="{'loading--overlay': showOverlay}">
    <div>
      <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
    showOverlay: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less">
@import '../styles.less';
.loading--overlay {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.column__loading {
  .glyphicon {
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
</style>
