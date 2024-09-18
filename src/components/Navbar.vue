<template>
  <nav ref="nav" :class="{ hideNav: hideNav, expanded: expanded }">
    <div id="container">
      <div class="navBar" :class="{ expanded: expanded, dark: isDark }">
        <div class="menuControl" @click="expanded = !expanded">
          <div class="icon"></div>
          <div class="heading" :class="{ dark: isDark }">
            <h1>{{ getNavHeader() }}</h1>
            <h6>{{ getSubHeader() }}</h6>
          </div>
        </div>
        <div class="menuIcons" v-show="currentNav != 'List' || expanded">
          <div class="donate">
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=XRYU35QG8RJPQ"
              target="_blank"
            >
              <i
                class="fas fa-solid fa-hand-holding-heart fa-lg"
                style="color: #ffd43b"
              ></i>
            </a>
          </div>
          <div class="language" @click="changeLanguage">
            <i
              class="fas fa-globe"
              :title="$t('message.navBar.changeLanguage')"
            />
            <span v-if="$i18n.locale == 'de'"> EN</span>
            <span v-if="$i18n.locale != 'de'"> DE</span>
          </div>
        </div>
      </div>
      <div
        v-if="currentNav == 'List' || currentNav == 'Info'"
        class="scrollBar"
        :style="{ width: scrollBarWidth + '%' }"
      ></div>

      <div id="menu" :class="{ open: expanded, dark: isDark }">
        <ul>
          <li>
            <a
              @click="navigate('Bingo')"
              :class="{ active: currentNav == 'Bingo' }"
              >{{ $t('message.navBar.bingo') }}<span class="space">o</span></a
            >
          </li>
          <li>
            <a
              @click="navigate('List')"
              :class="{ active: currentNav == 'List' }"
              >{{ $t('message.navBar.allQuotes')
              }}<span class="space">{{
                $t('message.navBar.lastChar')
              }}</span></a
            >
          </li>
          <li>
            <a
              @click="navigate('WhyVegan')"
              :class="{ active: currentNav == 'WhyVegan' }"
              >{{ $t('message.navBar.whyVegan')
              }}<span class="space">?</span></a
            >
          </li>
          <li>
            <a
              @click="navigate('Info')"
              :class="{ active: currentNav == 'Info' }"
              >{{ $t('message.navBar.info') }}<span class="space">o</span></a
            >
          </li>
          <li>
            <a
              @click="navigate('About')"
              :class="{ active: currentNav == 'About' }"
              >{{ $t('message.navBar.about') }}<span class="space">t</span></a
            >
          </li>
          <li>
            <a
              @click="navigate('Privacy')"
              :class="{ active: currentNav == 'Privacy' }"
              >{{ $t('message.navBar.privacy')
              }}<span class="space">{{
                $t('message.navBar.privacyLastChar')
              }}</span></a
            >
          </li>
        </ul>
        <div>
          <a
            @click="expanded = false"
            href="https://www.facebook.com/till.toll"
            target="_blank"
            class="fa fa-facebook"
          ></a>
          <a
            @click="expanded = false"
            href="https://www.instagram.com/flotischoti/"
            target="_blank"
            class="fa fa-instagram"
          ></a>
          <a
            @click="expanded = false"
            href="mailto:hello@vegan.bingo"
            class="far fa-envelope"
          ></a>
          <a
            @click="expanded = false"
            href="https://github.com/flotischoti/veganbingo"
            target="_blank"
            class="fab fa-github"
          ></a>
        </div>
      </div>
    </div>
    <Toast :text="getSelectedLang" :show="showToast" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from './Toast.vue';
import { useDark } from '@vueuse/core';

export default defineComponent({
  name: 'Navbar',
  components: {
    Toast,
  },
  props: {
    header: String,
    currentNav: {
      type: String,
      default: 'Bingo',
    },
  },
  data() {
    return {
      expanded: false,
      hideNav: false,
      scrollBarWidth: 0,
      showToast: false,
      isDark: useDark(),
    };
  },
  methods: {
    getNavHeader() {
      switch (this.currentNav) {
        case 'Bingo':
          return this.$t('message.navBar.veganBingo');
        case 'List':
          return (
            this.$t('message.navBar.allQuotes') +
            this.$t('message.navBar.lastChar')
          );
        case 'WhyVegan':
          return this.$t('message.navBar.whyVegan') + '?';
        case 'Info':
          return this.$t('message.navBar.info') + 'o';
        case 'About':
          return this.$t('message.navBar.about') + 't';
        case 'Privacy':
          return (
            this.$t('message.navBar.privacy') +
            this.$t('message.navBar.privacyLastChar')
          );
        default:
          return '';
      }
    },
    getSubHeader() {
      switch (this.currentNav) {
        case 'Bingo':
          return this.$t('message.navBar.veganBingoSub');
        default:
          return this.$t('message.empty');
      }
    },
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale.startsWith('de') ? 'en' : 'de';
      if (!this.showToast) {
        setTimeout(() => (this.showToast = false), 3000);
      }
      this.showToast = true;
    },
    navigate(target: string) {
      window.location.hash = target;
    },
  },
  watch: {
    currentNav() {
      this.expanded = false;
      this.scrollBarWidth = 0;
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 1);
    },
  },
  emits: {
    navigate: null,
  },
  mounted() {
    let lastScrollPos = 0;
    let navbar: HTMLElement = this.$refs.nav as HTMLElement;

    let fn = () => {
      let currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      let body = document.body;
      let html = document.documentElement;

      let docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      let winHeight = window.innerHeight;
      let navBarHeight = navbar.offsetHeight;

      if (
        lastScrollPos < currentScrollPos &&
        currentScrollPos > navBarHeight + navBarHeight
      ) {
        this.hideNav = !['About'].includes(this.currentNav);
        this.expanded = false;
      } else if (
        lastScrollPos > currentScrollPos &&
        !(currentScrollPos <= navBarHeight)
      ) {
        this.hideNav = false;
      }
      lastScrollPos = currentScrollPos;

      this.scrollBarWidth = (currentScrollPos / (docHeight - winHeight)) * 100;
    };

    window.addEventListener('scroll', fn);

    const hashNav = () => {
      const hash = new URL(location.href).hash.substring(1).split('?')[0];
      console.log(hash);
      if (
        ['Bingo', 'List', 'WhyVegan', 'Info', 'About', 'Privacy'].includes(hash)
      ) {
        this.$emit('navigate', hash);
      } else {
        window.location.hash = 'Bingo';
      }
    };
    hashNav();
    window.addEventListener('hashchange', hashNav);
  },
  computed: {
    getSelectedLang(): string {
      return this.$i18n.locale == 'de'
        ? this.$t('message.navBar.langChangedDe')
        : this.$t('message.navBar.langChangedEn');
    },
  },
});
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
@import '../style/variables';

$menu-color: hsl(319, 100%, 47%);
$bar-color: $menu-color;
$navBarColor: hsla(0, 0%, 20%, 1);

nav {
  z-index: 1000;
  position: sticky;
  width: 100%;
  top: 0;
  transition: transform 0.5s;
  user-select: none;

  &.expanded {
    z-index: 5000;
  }

  &.hideNav {
    transform: translateY(-64px);
  }
  .navBar {
    -webkit-transition: all 0.25s;
    z-index: 1000;
    background: $navBarColor;
    height: $nav-bar-height;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menuControl {
      height: 100%;

      &:hover {
        .icon {
          background: #bbb;
          &:before,
          &:after {
            background: #bbb;
          }
        }
      }

      &:focus,
      &:active {
        .icon {
          background: #fff;
          &:before,
          &:after {
            background: #fff;
          }
        }
      }

      .icon {
        -webkit-transition: all 0.25s;
        position: absolute;
        width: 20px;
        height: 1px;
        left: 0.75rem;
        top: 2rem;
        background-color: white;
        cursor: pointer;

        &:before,
        &:after {
          -webkit-transition: all 0.25s;
          width: 20px;
          height: 1px;
          left: 0;
          background: white;
          position: absolute;
          content: '';
        }
        &:before {
          top: -6px;

          @media screen and (min-width: 380px) {
            top: -8px;
          }
        }
        &:after {
          top: 6px;
          @media screen and (min-width: 380px) {
            top: 8px;
          }
        }
      }
    }

    &.expanded {
      .menuControl {
        .icon {
          -webkit-transform: rotate(180deg);
          background-color: transparent;
          left: 0.75rem;

          &:before,
          &:after {
            top: 0;
          }
          &:before {
            -webkit-transform: rotate(45deg);
          }
          &:after {
            -webkit-transform: rotate(-45deg);
          }
        }
      }
    }
    .heading {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 3em;
      cursor: pointer;
      color: white;

      h1 {
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-size: 1em;
        padding: 0;
        margin: 0;

        @media screen and (min-width: 380px) {
          font-size: 1.2em;
        }
      }

      h6 {
        padding: 0.1em 0;
        margin: 0;
        font-size: 0.6em;
        letter-spacing: 0.07em;
      }

      &.dark {
        color: $text-basic3;
      }
    }

    .menuIcons {
      display: flex;
      align-items: center;
      gap: 0.75em;

      .donate {
        cursor: pointer;
        padding: 0;
      }
      .language {
        cursor: pointer;
        padding: 0;
        margin: 0;
        z-index: 2000;
        margin-right: 0.75em;
        overflow: hidden;
        color: #fff;
        font-size: 1em;
        letter-spacing: 0.03em;

        &:hover {
          color: #bbb;
        }

        &:focus,
        &:active {
          color: #fff;
        }

        span {
          padding: 0;
          margin: 0;
        }
      }
    }

    &.dark {
      background-color: $navbar-background;
    }
  }
  .scrollBar {
    z-index: 1000;
    width: 200px;
    height: 2px;
    margin-bottom: -2px;
    background: $bar-color;
  }

  #menu {
    z-index: 5000;

    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: $nav-bar-height;
    font-size: 1em;
    text-transform: uppercase;
    width: 100%;
    height: 0;
    border-bottom: 1px solid transparent;
    overflow: hidden;

    @media screen and (min-height: 380px) {
      font-size: 1.3em;
    }

    & ul {
      list-style: none;
      padding: 0;
      letter-spacing: 0.4em;

      & li:first-child {
        margin-top: 0;
      }
      & li {
        transition: all 0.2s;
        margin-top: 1em;
        padding: 0;
        color: white;

        @media screen and (min-height: 380px) {
          margin-top: 1.3em;
        }
      }
      & li a {
        transition: all 0.25s;
        cursor: pointer;

        span {
          letter-spacing: 0;
        }
      }

      & li a.active {
        color: #ddd2a6;
        text-decoration: underline;
      }

      & li a:not(.active):hover {
        text-decoration: underline;
        letter-spacing: 0.5em;
      }
    }

    .fa,
    .far,
    .fab {
      width: 40px;
      margin: 8px 4px;
      text-decoration: none;
    }
    .fa-facebook,
    .fa-instagram,
    .fa-envelope,
    .fa-github {
      color: white;
    }
    &.open {
      -webkit-transition: all 0.5s;
      height: calc(100vh - $nav-bar-height - 1px);
      width: 100%;
      background: $menu-color;
      border-bottom: 1px solid black;

      &.dark {
        background: $menu-background;
      }
    }
  }
}
</style>
