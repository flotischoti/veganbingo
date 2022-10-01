<template>
  <div
    class="list-container"
    :style="cssVars"
    :class="{ disableScroll: disableScroll }"
    @click="hideSidebar()"
  >
    <div
      v-for="(f, index) in fields"
      :key="f.id"
      class="field"
      :id="'field' + index"
    >
      <div class="topGradient" v-if="index == 0"></div>
      <div class="fixed">
        <h1>{{ stripTitle($t(`${f.title}`)) }}</h1>
        <p><span v-html="$t(`${f.text}`)" /></p>
      </div>
      <section class="arrow" v-if="index == 0 && !scrolledFurther(0)">
        <a
          @click.prevent="scroll(index + 1)"
          :style="index == 0 ? { 'padding-top': 125 + 'px' } : ''"
        >
          <span class="black" />
          <span class="black" />
          <span class="black" />
        </a>
      </section>
    </div>
    <SideNav
      :show="showSidebar"
      :titles="getSortedDataFields.map((f) => stripTitle($t(`${f.title}`)))"
      @scroll="scroll($event + 1)"
      @show="showSidebar = $event"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { allFields, fieldType } from "../assets/data";
import SideNav from "./SideNav.vue";

import $ from "jquery";

export default defineComponent({
  name: "List",
  components: {
    SideNav,
  },
  data() {
    return {
      startField: {
        id: -1000,
        selected: false,
        selectable: false,
        title: "message.list.startSlideTitle",
        text: "message.list.startSlideText",
      } as fieldType,
      endField: {
        id: 1000,
        selected: false,
        selectable: false,
        title: "message.list.endSlideTitle",
        text: "message.list.endSlideText",
      } as fieldType,
      scrollPosition: 0,
      disableScroll: false,
      showSidebar: false,
    };
  },
  methods: {
    stripTitle(title: string) {
      return title.replace(/(<([^>]+)>)/gi, "");
    },
    scrolledFurther(fieldIndex: number) {
      return (
        this.scrollPosition >
        window.innerHeight * fieldIndex + (10 / 100) * window.innerHeight
      );
    },
    scroll(targetFieldId: number) {
      let offset = $("#field" + targetFieldId).offset();
      $("html, body").animate({ scrollTop: offset ? offset.top : 0 }, 500);
    },
    hideSidebar() {
      this.showSidebar = false;   
      $('body').css('overflow', 'auto');
    }
  },
  mounted() {
    let fn = () => {
      let currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      this.scrollPosition = currentScrollPos;
    };
    window.addEventListener("scroll", fn);
  },
  computed: {
    cssVars() {
      return {
        "--list-count": allFields.length + 2,
      };
    },
    fields(): fieldType[] {
      return [this.startField, ...this.getSortedDataFields, this.endField];
    },
    getSortedDataFields(): fieldType[] {
      return allFields.sort((a, b) => a.id - b.id);
    }
  },
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");

$totalCount:  61 + 2;

.list-container {
  width: 100%;
  height: calc(100vh * var(--list-count));

  .field {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100vh;
    letter-spacing: 4px;
    overflow: hidden;
    clip-path: inset(0 0 0 0);
    font-size: 0.8em;

    @for $i from 1 through $totalCount {
      $color: hsl(250 * $i, 70%, 40%, 1);

      &:nth-child(#{$i}) {
        @if ($i==1) {
          background-color: #fff;
          color: #000;
          top: 0;
        } @else if($i==$totalCount) {
          background-color: #000;
          color: #fff;
          top: (100vh * ($i - 1));
        } @else {
          background-color: $color;
          color: #fff;
          top: (100vh * ($i - 1));
          box-shadow: inset 0 1px 80px rgba(0, 0, 0, 0.14);
        }
        z-index: ($i + 1);
        .fixed {
          transform: translate(-50%, -50%);
          z-index: ($i);
          p {
            span:deep(a) {
              color: white;
            }
          }

        }
      }
    }
    .topGradient {
      z-index: 100;
      width: 100%;
      height: 10px;
      background: linear-gradient(141deg, #48ded4 0%, #a026bf 51%, #e82c75 75%);
    }

    .fixed {
      overflow: hidden;
      position: fixed;
      width: 80%;
      top: 50%;
      left: 50%;

      h1 {
        line-height: 110%;
        font-size: 1.5em;
        @media (min-width: 480px) {
          & {
            font-size: 2em;
          }
        }
      }

      p {
        line-height: 150%;
        font-size: 0.7em;

        @media (min-width: 330px) {
          & {
            font-size: .9em;
          }
        }

        @media (min-width: 330px) and (min-height: 768px) {
          & {
            font-size: 1em;
          }
        }

        @media (min-width: 480px) and (min-height: 560px){
          & {
            font-size: 1em;
          }
        }
        @media (min-width: 768px) and (min-height: 480px) {
          & {
            font-size: 1.2em;
          }
        }
      }
    }
    .arrow {
      a {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: inline-block;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        transition: opacity 0.3s;
        cursor: pointer;
        padding-top: 44px;

        @media (min-width: 480px) {
          padding-top: 80px;
        }

        &:hover {
          opacity: 0.5;
        }

        span {
          position: absolute;
          top: 0;
          left: 50%;
          width: 24px;
          height: 24px;
          margin-left: -12px;
          -webkit-animation: sdb07 2s infinite;
          animation: sdb07 2s infinite;
          opacity: 0;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);

          &:nth-of-type(1) {
            -webkit-animation-delay: 0s;
            animation-delay: 0s;
          }
          &:nth-of-type(2) {
            top: 16px;
            -webkit-animation-delay: 0.15s;
            animation-delay: 0.15s;
          }
          &:nth-of-type(3) {
            top: 32px;
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
          }

          &.black {
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }

  @-webkit-keyframes sdb07 {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes sdb07 {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

@media (min-width: 768px) {
}
</style>
