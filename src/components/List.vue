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
      :class="{ dark: isDark }"
      :id="'field' + index"
    >
      <div class="topGradient" v-if="index == 0"></div>
      <div class="fixed">
        <h1 @click="scrollAndSetHash(f)">
          <span v-if="index > 0 && index < fields.length - 1"
            ><i class="fa fa-link"></i>{{ ` ${f.id}` }}{{ ': ' }}</span
          >{{ stripTitle($t(`${f.title}`)) }}
        </h1>
        <p><span v-html="$t(`${f.text}`)" /></p>
        <section class="arrow" v-if="index == 0">
          <div @click.prevent="scroll(index + 1, true)">
            <span />
            <span />
            <span />
          </div>
        </section>
      </div>
    </div>
    <SideNav
      :show="showSidebar"
      :titles="getSortedDataFields.map((f) => stripTitle($t(`${f.title}`)))"
      @scroll="scroll($event + 1)"
      @show="showSidebar = $event"
    />
    <Toast :text="toastMessage" :show="showToast" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { allFields, fieldType } from '../assets/data';
import SideNav from './SideNav.vue';

import $ from 'jquery';
import { useDark } from '@vueuse/core';
import Toast from './Toast.vue';
import { getHash, stripTitle } from './../util/url';

export default defineComponent({
  name: 'List',
  components: {
    SideNav,
    Toast,
  },
  data() {
    return {
      startField: {
        id: 0,
        selected: false,
        selectable: false,
        title: 'message.list.startSlideTitle',
        text: 'message.list.startSlideText',
      } as fieldType,
      endField: {
        id: allFields.length + 1,
        selected: false,
        selectable: false,
        title: 'message.list.endSlideTitle',
        text: 'message.list.endSlideText',
      } as fieldType,
      showToast: false,
      toastMessage: '',
      scrollPosition: 0,
      disableScroll: false,
      showSidebar: false,
      isDark: useDark(),
    };
  },
  methods: {
    stripTitle: stripTitle,
    scrollAndSetHash(targetField: fieldType) {
      if (targetField.id > 0 && targetField.id < this.fields.length - 1) {
        window.location.hash = getHash(
          targetField.id,
          this.$t(targetField.title)
        );
        navigator.clipboard.writeText(location.href);
        this.toast(this.$t('message.board.toast.urlCopied'));
      }
      this.scroll(targetField.id, true);
    },
    scroll(targetFieldId: number, animate = false) {
      // scroll exactly one screen height when scrolling down from first slide.
      // Otherwise scroll to offset of selected field
      let offset =
        targetFieldId == 1 && window.scrollY < window.innerHeight
          ? window.innerHeight
          : $('#field' + targetFieldId).offset()?.top;
      if (animate)
        $('html, body').animate({ scrollTop: offset ? offset : 0 }, 250);
      else $('html, body').scrollTop(offset ? offset : 0);
    },
    hideSidebar() {
      this.showSidebar = false;
      $('body').css('overflow', 'auto');
    },
    toast(text: string) {
      this.toastMessage = text;
      if (!this.showToast) {
        setTimeout(() => (this.showToast = false), 3000);
      }
      this.showToast = true;
    },
  },
  mounted() {
    const selectedStmt = new URL(location.href).hash
      .substring(1)
      .split('?')
      .find((s) => s.match('^stmt=[0-9]+-.+$'))
      ?.split('=')[1]
      .split('-')[0];
    const stmtGiven = selectedStmt && !Number.isNaN(selectedStmt);
    if (stmtGiven)
      setTimeout(() => {
        this.scroll(
          Math.max(Math.min(Number(selectedStmt), this.fields.length - 1), 1)
        );
      }, 750);
  },
  computed: {
    cssVars() {
      return {
        '--list-count': allFields.length + 2,
      };
    },
    fields(): fieldType[] {
      return [this.startField, ...this.getSortedDataFields, this.endField];
    },
    getSortedDataFields(): fieldType[] {
      return allFields.sort((a, b) => a.id - b.id);
    },
  },
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
@import '../style/variables.scss';

$firstLastSlide: $background1;
$totalCount: 62 + 2;
$fieldContentWidth: 70vw;
$skewAngle: 11deg;

.list-container {
  overflow: hidden;
  background-color: $firstLastSlide;
  .field {
    position: relative;
    text-align: center;
    letter-spacing: 4px;
    font-size: 0.8em;

    @for $i from 1 through $totalCount {
      $color: hsl(250 * $i, 70%, 15%, 1);
      color: $text-basic3;

      &:nth-child(#{$i}) {
        @if ($i==1) {
          background-color: $firstLastSlide;
          height: calc(100vh - $nav-bar-height);
          z-index: 1;
          // top: 0;
        } @else if($i==$totalCount) {
          background-color: $firstLastSlide;
          transform: skewY(calc($skewAngle * -1));
          .fixed {
            transform: skewY($skewAngle);
          }
          // top: (100vh * ($i - 1));
        } @else {
          @if ($i==2) {
            &::before {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: $color;
              content: '';
              transform: skewY($skewAngle);
            }
          }
          background-color: $color;
          box-shadow: inset 0 1px 80px rgba(0, 0, 0, 0.14);
          transform: skewY(calc($skewAngle * -1));
          .fixed {
            transform: skewY($skewAngle);
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
      width: $fieldContentWidth;
      padding: calc(tan($skewAngle) * $fieldContentWidth / 2 + 10em) 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      h1 {
        line-height: 110%;
        font-size: 1.5em;
        cursor: pointer;

        i {
          font-size: 0.85em;
        }

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
            font-size: 0.9em;
          }
        }

        @media (min-width: 330px) and (min-height: 768px) {
          & {
            font-size: 1em;
          }
        }

        @media (min-width: 480px) and (min-height: 560px) {
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
      .arrow {
        div {
          position: relative;
          display: inline-block;
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
            width: 12px;
            height: 12px;
            margin-left: -12px;
            -webkit-animation: sdb07 2s infinite;
            animation: sdb07 2s infinite;
            opacity: 0;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            border-left: 1px solid #777;
            border-bottom: 1px solid #777;

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
}

@media (min-width: 768px) {
}
</style>
