<template>
  <div id="snackbar" :class="{show: show}">{{text}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Toast',
  props: {
    text: String,
    show: Boolean,
  },
});
</script>

<style scoped lang="scss">

#snackbar {
  visibility: hidden;
  min-width: 15em;
  background-color: #333;
  color: #fff;
  opacity: .95;
  text-align: center;
  border-radius: .33em;
  position: fixed;
  z-index: 10000;
  left: 50%;
  bottom: 4em;
  padding: .8em;
  font-size: .8em;
  user-select: none;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 0.03em;

  @media (min-width: 480px) {
    padding: 1em;
  font-size: 1em;
  }
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 4em; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 4em; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 4em; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 4em; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

</style>
