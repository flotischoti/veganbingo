<template>
  <div class="modalBox" :class="{ fadeIn: show, fadeOut: !show }">
    <div class="content">
      <blockquote class="header">
        <h3>{{ title }}</h3>
      </blockquote>
      <div class="text">
        <span v-html="$t(`${field.text}`)" />
      </div>
    </div>
    <div class="controls">
      <button class="close" @click="$emit('close')">
        <i class="fas fa-times"></i> {{ $t("message.board.popup.close") }}
      </button>
      <button class="copy" @click="copy">
        <i class="fas fa-copy"></i> {{ $t("message.board.popup.copy") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalBox",
  props: {
    field: Object,
    show: Boolean,
  },
  emit: {
    close: null,
    copy: null,
  },
  computed: {
    title() {
      return this.field && this.field.title
        ? this.$t(`${this.field.title}`).replace(/(<([^>]+)>)/gi, "")
        : "";
    },
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(
        this.stripText(this.$t(this.field?.title)) +
          " - " +
          this.stripText(this.$t(this.field?.text))
      );
      this.$emit("copy");
    },
    stripText(title: string) {
      return title.replace(/(<([^>]+)>)/gi, "");
    },
  },
});
</script>

<style scoped lang="scss">
.modalBox {
  position: absolute;
  opacity: 0.98;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 0px;
  height: 1%;
  background: linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%));
  box-shadow: 0.4rem 0.4rem 2.4rem 0.2rem hsla(236, 50%, 50%, 0.3);
  margin: auto;
  transform: translateY(-0.5%);
  border-radius: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  &.fadeIn {
    max-width: 98.5%;
    height: 98.5%;
    z-index: 200;
    transition: max-width 0.5s 0.3s, height 0.5s 0.8s;
  }

  &.fadeOut {
    transition: max-width 0.5s 0.502s, height 0.5s, z-index 0s 1.05s;
  }

  .content {
    transition: opacity 0.1s 0s, transform 0.3s 0s;
    padding: 1em;
    color: white;
    position: relative;
    overflow-y: scroll;
    scrollbar-width: none;
    overflow-x: hidden;

    blockquote {
      margin: 0;
      position: relative;
      width: 100%;
      text-align: center;
      letter-spacing: 0.03em;
      text-transform: uppercase;

      h3 {
        padding: 0 2em;
        font-size: 0.9em;

        @media (min-width: 380px) {
          & {
            font-size: 1em;
          }
        }

        @media (min-width: 768px) and (min-height: calc(768px + 64px + 100px + 53px)) {
          & {
            font-size: 1.5em;
          }
        }
      }

      &::before,
      &::after {
        position: absolute;
        height: 3rem;
        font: 6rem/100% Georgia, "Times New Roman", Times, serif;
        font-size: 4em;
      }

      &::before {
        content: "“";
        top: -0.4em;
        left: 0;
      }

      &::after {
        content: "”";
        bottom: -0.65em;
        right: 0;
      }
    }

    .text {
      padding-top: 1.3em;
      letter-spacing: 0.03em;
      position: relative;
      text-align: center;
      font-size: 0.68em;
      line-height: 160%;

      span {
        &:deep(a) {
          color: white;
        }
      }

      @media (min-width: 330px) and (min-height: calc(330px + 64px + 73px + 41px)) {
        & {
          font-size: 0.79em;
        }
      }

      @media (min-width: 480px) and (min-height: calc(480px + 64px + 100px + 53px)) {
        & {
          font-size: 0.9em;
        }
      }

      @media (min-width: 768px) and (min-height: calc(768px + 64px + 100px + 53px)) {
        & {
          font-size: 1em;
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 50px;
        height: 2px;
        background-color: salmon;
      }
    }
  }

  .controls {
    transform: translateY(4%);
    button {
      width: 50%;
      padding: 1em;
      text-transform: uppercase;
      outline: none;
      border: none;
      cursor: pointer;
      color: #fff;
      font-size: 0.8em;
      letter-spacing: 0.1em;
      user-select: none;
      -webkit-tap-highlight-color: rgba(
        0,
        0,
        0,
        0
      ); // Remove stupid blue box when clicking on safari/chrome

      @media (min-width: 480px) {
        font-size: 0.9em;
      }

      &:hover,
      &:active {
        opacity: 0.8;
      }

      &:focus {
        opacity: 1;
      }
    }

    .close {
      background: rgb(255, 72, 72);
    }
    .copy {
      background: rgb(79, 99, 210);
    }
  }
}
</style>
