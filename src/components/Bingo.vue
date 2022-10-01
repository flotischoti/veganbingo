<template>
  <div class="bingo">
    <Board @navigate="$emit('navigate', $event)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './Board.vue'

export default defineComponent({
  name: 'Bingo',
  data() {
    return {
    }
  },
  components: {
    Board
  },
  methods: {
  },
  emits: {
    navigate: null,
  }
});
</script>

<style scoped lang="scss">

  .bingo {
    overflow: hidden;
  }

</style>
