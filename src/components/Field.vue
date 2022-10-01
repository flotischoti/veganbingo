<template>
  <div
    class="field"
    @mousedown="handleClick"
    @touchstart.prevent="handleClick"
    @mouseup="handleRelease"
    @touchend.prevent="handleRelease"
    :class="classObject"
  >
    <div class="fieldContent">
      <span v-html="$t(`${field.title}`)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { fieldType } from "../assets/data";

export default defineComponent({
  name: "Field",
  props: {
    field: {
      type: Object as PropType<fieldType>,
    },
    updateTrigger: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      if (this.field?.selectable) {
        this.$emit("selectField", this.field);
      }
    },
    handleRelease() {
      if (this.field?.selectable) {
        this.$emit("release");
      }
    },
  },
  emits: {
    selectField: null,
    release: null,
  },
  computed: {
    classObject() {
      return {
        selected: this.field ? this.field.selected : false,
        center: this.field ? this.field.id == 0 : false,
        nonCenter: this.field ? this.field.id != 0 : false,
        spin: this.updateTrigger ? this.updateTrigger > 0 : false,
      };
    },
  },
});
</script>

<style scoped lang="scss">
@use "sass:math";
@import url("https://fonts.googleapis.com/css2?family=Krub&display=swap");
@import "../style/variables";

$fieldTextColor: #444;

.center {
  background-image: url("../../public/logo.svg");
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
}

.nonCenter {
  transition: all 0.01s ease-in-out;
  // box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  color: $fieldTextColor;
  background-color: #fff;
  font-size: 0.85em;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }

  &.spin {
    animation-name: spinner;

    @for $i from 1 through 25 {
      $count: math.div(random(2), 2);
      $duration: math.div((random(4) + 4), (6 - $count * 1.5));

      &:nth-child(#{$i}) {
        animation-timing-function: ease-out;
        animation-iteration-count: $count;
        animation-duration: $duration + s;
      }
    }
  }

  .fieldContent {
    user-select: none;
    font: 0.4em "Krub", sans-serif;
    font-weight: bold;
    overflow: hidden;
    padding: 0.05em;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    background: rgb(255, 58, 58);
    display: block;
    width: 100%;
    height: 10px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;
    height: 0px;
    transition: opacity 0.3s;
  }

  &.selected::before,
  &.selected::after {
    opacity: 0.75;
    height: 8px;
  }

  &:after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:active {
    transform: scale(99%);
  }
}

.field {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  text-align: center;
  cursor: pointer;
  z-index: 100;
  border-radius: 1px;

  &:nth-child(1) {
    border-top-left-radius: 6%;
  }
  &:nth-child(5) {
    border-top-right-radius: 6%;
  }
  &:nth-child(13) {
    cursor: unset;
  }
  &:nth-child(21) {
    border-bottom-left-radius: 6%;
  }
  &:nth-child(25) {
    border-bottom-right-radius: 6%;
  }
}

@media (min-width: $bp1) and (min-height: calc($bp1 + $nav-bar-height + $title-height-0 + $footer-height-0)) {
  .field {
    .fieldContent {
      padding: 0.18em;
      font-size: 0.56em;
    }
  }
}

@media (min-width: $bp2) and (min-height: calc($bp2 + $nav-bar-height + $title-height-2 + $footer-height-2)) {
  .field {
    .fieldContent {
      padding: 0.2em;
      font-size: 0.71em;
    }
  }
}

@media (min-width: $bp3) and (min-height: calc($bp3 + $nav-bar-height + $title-height-2 + $footer-height-3)) {
  .field {
    .fieldContent {
      font-size: 0.85em;
    }
  }
}

@media (min-width: $bp4) and (min-height: calc($bp4 + $nav-bar-height + $title-height-4 + $footer-height-3)) {
  .field {
    .fieldContent {
      font-size: 0.95em;
    }
  }
}

@media (min-width: $bp5) and (min-height: calc($bp5 + $nav-bar-height + $title-height-4 + $footer-height-3)) {
  .field {
    .fieldContent {
      padding: 0.3em;
      font-size: 1.05em;
    }
  }
}

@media (min-width: $bp6) and (min-height: calc($bp6 + $nav-bar-height + $title-height-6 + $footer-height-3)) {
  .field {
    .fieldContent {
      padding: 0.3em;
      font-size: 1.2em;
    }
  }
}

@keyframes spinner {
  from {
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    color: #fff;
  }
  to {
    -moz-transform: rotateY(-720deg);
    -ms-transform: rotateY(-720deg);
    transform: rotateY(-720deg);
    color: #444;
  }
}
</style>
