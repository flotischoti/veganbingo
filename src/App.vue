<template>
  <Navbar
    :currentNav="navigation"
    class="navbar"
    @navigate="navigation = $event"
  />
  <main>
    <keep-alive :include="include">
      <component :is="navigation" @navigate="navigation = $event" />
    </keep-alive>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Bingo from "./components/Bingo.vue";
import Navbar from "./components/Navbar.vue";
import List from "./components/List.vue";
import Info from "./components/Info.vue";
import About from "./components/About.vue";
import WhyVegan from "./components/WhyVegan.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      navigation: "Bingo",
      include: ["Bingo"],
    };
  },
  components: {
    Navbar,
    Bingo,
    List,
    WhyVegan,
    Info,
    About,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Krub:wght@300&display=swap");

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
}

#app {
  font-family: "Krub", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  height: 100%;
}

@media (min-width: 768px) {
}
</style>
