<template>
  <div ref="popupContainer" class="popupContainer" :class="{visible: show}" @click="$emit('cancel')" @keyup.enter="$emit('confirm')" @keyup.esc="$emit('cancel')" tabindex="0" >
    <div class="popup"  :class="{dark: isDark}" @click.stop>
      <div class="header">
        <span>{{title}}</span>
        <i class="fa fa-window-close" aria-hidden="true" @click="$emit('cancel')"/>
      </div>
      <div class="text" :class="{dark: isDark}">
        <slot></slot>
      </div>
      <div class="buttons">
        <button class="cancel" :class="{dark: isDark}" @click="$emit('cancel')" v-if="confirmButtons">{{$t("message.board.popup.cancel")}}</button>
        <button class="confirm" :class="{dark: isDark}" @click="$emit('confirm')" v-if="confirmButtons">{{$t("message.board.popup.confirm")}}</button>
        <button class="copy" :class="{dark: isDark}" @click="$emit('copy')" v-if="copyButton"><i class="fas fa-copy"></i>  {{$t("message.board.popup.copy")}}</button>
      </div>
    </div>
    <div class="background" :class="{visible: show}"/>
  </div>
</template>

<script lang="ts">
import { useDark } from '@vueuse/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmationPopup',
  data() {
    return {
      isDark: useDark()
    }
  },
  props: {
    title: String,
    text: String,
    show: Boolean,
    confirmButtons: Boolean,
    copyButton: Boolean,
  },
  emits: {
    cancel: null,
    confirm: null,
    copy: null,
  },
  watch: {
    show() {
      if (this.show) {
        (this.$refs.popupContainer as HTMLElement).focus(); 
      } else {
        (this.$refs.popupContainer as HTMLElement).blur(); 
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import "../style/variables.scss";

.popupContainer {
  background-color: transparent;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  opacity: 0;
  z-index: 0;
  transition: all .1s;

  &.visible {
    opacity: 1;
    z-index: 200;
    transition: opacity .2s;
  }

  .popup {
    width: 80%;
    height: max-content;
    background-color: #fff;
    border-radius: .33em;
    padding: 0;
    color: #444;
    margin-top: 6em;
    overflow: hidden;
    z-index: 201;

    &.dark {
        background: $background2;
        color: $text-basic3;
      }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5em;
      background-color: hsl(0, 0%, 13%);
      color: #fff;
      font-size: 1.0em;
      letter-spacing: .1em;

      @media (min-width: 480px) {
        font-size: 1.1em;
      }

      i {
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }

    }
    .text {
      padding: 2em .5em;
      font-size: .8em;
      line-height: 160%;
      letter-spacing: .03em;
      word-break: break-word;

      @media (min-width: 480px) {
        font-size: .9em;
      }

      
    }

    .buttons {
      overflow: hidden;
      transform: translateY(4%);
      button {
        width: 50%;
        padding: 1em;
        text-transform: uppercase;
        outline: none;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: .9em;
        letter-spacing: .1em;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0); // Remove stupid blue box when clicking on safari/chrome

        @media (min-width: 480px) {
          font-size: 1em;
        }

        &:hover, &:active {
          opacity: .8;
        }

        &:focus {
          opacity: 1;
        }
      }
      .cancel {
        background: rgb(255, 72, 72);

        &.dark {
          background: $cancel;
        }
      }

      .confirm {
        background: rgb(147, 210, 79);

        &.dark {
          background: $confirm
        }
      }

      .copy {
        width: 100%;
        background: rgb(79, 99, 210);
        
        &.dark {
          background: $copy;
        }
      }

    }

    

  }
  .background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: hsla(0, 0%, 0%, 0.9);
      transition: all .1s;
    }
}

</style>
