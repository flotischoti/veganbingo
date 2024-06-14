<template>
  <div class="sideNavContainer" @click.stop>
    <div class="openSidebar" @click="doShow">
      <i class="fas fa-list"></i>
    </div>
    <div id="mySidenav" class="sidenav" :class="{ show: show }">
      <a href="javascript:void(0)" class="closebtn" @click="doHide">&times;</a>
      <div class="linkContainer">
        <span v-for="(title, index) in titles" :key="index">
          <a @click="navigate(index)">
            #{{ index + 1 }}{{ ' ' }} {{ title }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import $ from 'jquery';

export default defineComponent({
  name: 'SideNav',
  data() {
    return {};
  },
  props: {
    show: Boolean,
    titles: {
      type: Array,
    },
  },
  methods: {
    doShow() {
      this.$emit('show', true);
      $('body').css('overflow', 'hidden');
    },
    doHide() {
      this.$emit('show', false);
      $('body').css('overflow', 'auto');
    },
    navigate(index: number) {
      this.doHide();
      window.location.hash = `#List?stmt=${index + 1}`;
      this.$emit('scroll', index);
    },
  },
  emits: {
    show: null,
    scroll: null,
  },
  components: {},
});
</script>

<style scoped lang="scss">
@import '../style/variables.scss';
.sideNavContainer {
  .openSidebar {
    position: fixed;
    z-index: 2000;
    top: 0.7em;
    right: 0.8em;
    background-color: bbb;
    border-radius: 50%;
    padding: 0.4em;
    font-size: 1.2em;

    &:hover {
      cursor: pointer;
      color: #666;
    }
  }
  .sidenav {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 2001;
    top: 0;
    right: 0;
    background-color: $background3;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: 0.5s;
    transform: translateX(100%);
    padding: 0;
    display: flex;
    justify-content: space-between;

    @media (min-width: 480px) {
      width: 70%;
    }

    @media (min-width: 768px) {
      width: 50%;
    }

    &.show {
      transform: translateX(0%);
    }

    a {
      text-decoration: none;
      font-size: 0.9em;
      color: $text-basic3;
      transition: 0.3s;
      cursor: pointer;

      @media (min-width: 480px) {
        font-size: 0.95em;
      }

      @media (min-width: 768px) {
        font-size: 1em;
      }

      &:hover {
        color: #ddd;
      }
    }

    .linkContainer {
      height: 100vh;
      span {
        display: block;
        text-align: end;
        padding: 0.2em 0.6em 0.2em 0;

        @media (min-width: 480px) {
          padding: 0.25em 0.6em 0.25em 0;
        }

        @media (min-width: 768px) {
          padding: 0.3em 0.6em 0.3em 0;
        }

        a {
          position: relative;
          background: linear-gradient(to bottom, transparent 80%, #cac55a 0)
            center center/100% 100% no-repeat;

          &:hover {
            background-size: 0%;
          }
        }
      }
    }

    .closebtn {
      position: sticky;
      top: 0;
      padding: 0;
      font-size: 3.5em;
      background-color: $background3;
      line-height: 0.5em;
      letter-spacing: 0;
    }
  }
}
</style>
