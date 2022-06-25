<template>
  <div class="bingo">
    <Board @initialized="showWelcome = false" @navigate="$emit('navigate', $event)"/>
    <article name="welcomePopupBackground" :class="{hidden: !visible}" v-if="showWelcome" @click="visible=false"> 
      <section :class="{hidden: !visible}" data-aos="fade-down" @click.stop>
        <h3>{{ $t("message.welcome.title1")}}<br><strong>{{$t("message.welcome.title2")}}</strong>{{$t("message.welcome.title3")}}</h3>
        <h5>{{$t("message.welcome.line1")}}<br>{{$t("message.welcome.line2")}}</h5>
        <p v-html="$t('message.welcome.instruction')"/>
        <button @keyup.enter="visible = false" @click="enter" autofocus>{{$t("message.welcome.button")}}</button>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './Board.vue'

export default defineComponent({
  name: 'Bingo',
  data() {
    return {
      visible: true,
      showWelcome: true,
    }
  },
  components: {
    Board
  },
  methods: {
    enter() {
      this.visible = false;
      setTimeout(function () { window.scrollTo(0, 0); }, 1);
    }
  },
  emits: {
    navigate: null,
  }
});
</script>

<style scoped lang="scss">

  .bingo {
    overflow: hidden;
    
    article {
      position: fixed;
      z-index: 2000;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      top: 0;
      background-color: hsla(50, 100%, 3%, .9);
      transition: opacity 1s, z-index 1s;

      &.hidden {
        opacity: 0;
        z-index: -1;
      }

      section {
        top: 0;
        left: 0;
        right: 0;
        opacity: 1;
        width: 23em;
        height: 18em;
        background: rgba(236, 240, 241, 1);
        border-left: .5em solid #fff;
        border-bottom: .5em solid #fff;
        border-right: .5em solid #fff;
        border-radius: 0 0 10% 10%;
        text-align: center;
        transition: transform 1s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        

        &.hidden {
          transform: translateY(-23em);
        }

        h3 {
          font-weight: bold;
          margin: 0;
          padding: 0;

          strong {
            position: relative;

            &::after {
              content: '';
              position: absolute;
              bottom: -0.125rem;
              left: -0.5rem;
              right: -0.5rem;
              height: 0.75rem;
              z-index: -1;
              background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg');
              background-repeat: no-repeat;
              background-size: cover;
            }
          }
        }

        h5 {
          margin: 0;
          padding: 0;

        }

        p {
          margin: 0;
          padding: 0;
          font-size: 0.8em;
          letter-spacing: .01em;
          line-height: 1.5em;
          
        }

        button {
          padding: 1em;
          text-transform: uppercase;
          letter-spacing: .05em;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          background: #FF7391;
          color: #333;
          cursor: pointer;
          border: none;
          outline: none;
          text-decoration: none;
          margin: 0;

        }

        
      }
    }

    

  }

</style>
