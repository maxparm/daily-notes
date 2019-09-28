<template>
  <div class="container">
    <div v-for="note in dailyNotes">
      <h1>{{ note.date }}</h1>
      <div v-html="note.html"></div>
      <hr>
    </div>
  </div>
</template>

<script>
import storeMixin from './mixins/store.js';

export default {
  mixins: [storeMixin],
  props: ['dailyNotes', 'loading'],
  mounted () {
    this.store.getAll();
  }
};
</script>

<style lang="less" scoped>
@import '../styles.less';

.container {
  &-calendar {
    float: left;
    width: 49%;
    display: block;
    &--shown {
      display: block;
    }
  }
  &-archive {
    float: left;
    width: 49%;
    margin-left: 2%;
  }
  @media (max-width: @responsive-width) {
    &-calendar, &-archive {
      float: none;
      width: 100%;
      margin: 0;
    }
    &-calendar {
      display: none;
      &--shown {
        display: block;
      }
    }
  }
}


.calendar {
  &__cursor {
    font-size: 18px;
    display: block;
    padding: 0 10px;
    background: white;
    border: 1px solid darken(@background, 10%);
    border-radius: 3px;
    font-size: 30px;
    line-height: 19px;
    height: 25px;
  }
  &__date {
    font-size: 18px;
    margin: 0 0 10px;
  }
  &__toggle-button {
    display: none;
    @media (max-width: @responsive-width) {
      display: block;
    }
  }
}
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  td, th {
    border: 1px solid darken(@background, 10%);
    background: white;
    text-align: center;
    padding: 0;
    span {
      padding: 0 2px;
      display: block;
      font-size: 9px;
    }
    a, div {
      display: block;
      padding: 4px 0;
      border: 1px solid transparent;
    }
    a {
      font-weight: bold;
      background: @background-success;
      &.selected {
        border: 1px solid @color2;
      }
    }
  }
  th {
    padding: 4px 0;
  }
  td {
    color: @color-meta;
  }
}
</style>
