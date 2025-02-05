<template>
  <Navbar
    :currentNav="navigation"
    class="navbar"
    @navigate="navigate($event)"
  />
  <div id="donateBanner" v-if="!hide">
    <div class="content">
      <i class="fas fa-bullhorn"></i>
      <span>{{this.$t('message.app.donateBanner.text')}} 
        <a href="https://www.paypal.com/donate/?hosted_button_id=XRYU35QG8RJPQ"
          target="_blank"
        >{{this.$t('message.app.donateBanner.donate')}}</a>&nbsp;{{this.$t('message.app.donateBanner.heart')}}</span></div>
    <div class="close" @click="hide=true">
      <i class="fas fa-times-circle fa-lg"></i>
    </div>
  </div>
  <main :class="{ dark: isDark }">
    <keep-alive :include="include">
      <component :is="navigation" />
    </keep-alive>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Bingo from './components/Bingo.vue';
import Navbar from './components/Navbar.vue';
import List from './components/List.vue';
import Info from './components/Info.vue';
import About from './components/About.vue';
import WhyVegan from './components/WhyVegan.vue';
import Privacy from './components/Privacy.vue';
import { useDark } from '@vueuse/core';

export default defineComponent({
  name: 'App',
  data() {
    return {
      navigation: 'Bingo',
      include: ['Bingo'],
      isDark: useDark(),
      hide: false
    };
  },
  methods: {
    navigate(target: string) {
      this.navigation = target;
    },
  },
  components: {
    Navbar,
    Bingo,
    List,
    WhyVegan,
    Info,
    About,
    Privacy,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Krub:wght@300&display=swap');
@import './style/variables';

body,
html {
  margin: 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

main {
  position: relative;
  color: #444;

  &.dark {
    background-color: $background1;
    color: $text-basic3;
  }
}

#donateBanner {
  opacity: .92;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 20px 0px;
  z-index: 1000;
  background-color: hsla(0, 0%, 20%, 1);;
  
  .content {
    display: flex;
    flex-grow: 1;
    gap: 5px;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    color: #eee;
    
    a {
      color: #eee
    }
  }

  .close {
    padding-right: 20px;
    flex-grow: 0;
    cursor: pointer;
  }
}

#app {
  font-family: 'Krub', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  height: 100%;
}

@media (min-width: 768px) {
}
</style>
