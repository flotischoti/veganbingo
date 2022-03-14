<template>
  <div class="WhyVeganContainer">
    <article v-for="(slider, index) in veganArguments" :key="index">
      <div class="textWrapper">
        <h5 v-if="slider.headerline">{{$t(`${slider.headerline}`)}}</h5>
        <p v-for="(text, index) in slider.texts" :key="index" v-html="$t(`${text.text}`)" :class="{quote: text.quote}"/>
      </div>
      <div class="slider-container" :data-aos="index % 2 == 0 ? 'fade-left' : 'fade-right'" :style="{'background-color': 'hsla(' + (250 * (57 + slider.id)) + ', 80%, 30%, .8)'}">
        <ul class="controls" :id="slider.controlsId" aria-label="Carousel Navigation" tabindex="0">
            <li class="prev" data-controls="prev" aria-controls="customize" tabindex="-1">
              <i class="fa fa-chevron-left fa-2x"></i>
            </li>
            <li class="next" data-controls="next" aria-controls="customize" tabindex="-1">
              <i class="fa fa-chevron-right fa-2x"></i>          
            </li>
        </ul>
        <div :class="slider.sliderClass">
            <div v-for="(item, index) in slider.items" :key="index" class="slider-item" :style="{'background-color': 'hsl(0, 80%, 30%, 0)'}">
                <div class="card" :style="{'background-color': 'hsl(' + (250 * (25 + slider.id)) + ', 80%, 30%, 0)'}">    
                    <h2 v-if="item.customHeader"> {{item.customHeader}} {{(index + 1)}} </h2>            
                    <i v-if="!item.customHeader" :class="item.classes"> {{' ' + (index + 1)}}</i>
                    <p class="card_description">{{$t(`${item.text}`)}}</p>
                </div>
            </div>
        </div>    
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TinySliderSettings, tns, tns as tns2, tns as tns3, tns as tns4 } from "tiny-slider"
import { veganArguments } from "../assets/arguments"

export default defineComponent({
  name: 'Info',
  data() {
    return {
      veganArguments,
    }
  },
  components: {

  },
  methods: {
    getColorCode(sliderCounter: number) {
      switch (sliderCounter) {
        case 1: {
          return 'D291BC'
        }
        case 2: {
          return 'C2AAA3'
        }
        case 3: {
          return '7B8FA5'
        }
        case 4: {
          return 'A3B79C'
        }
      }
    }
  },
  mounted() {
    let config: TinySliderSettings = {
      container: '.my-slider',
      loop: true,
      items: 1,
      slideBy: 'page',
      nav: false,    
      autoplay: true,
      speed: 400,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      arrowKeys: true,
      // gutter: 5,
      controlsContainer: "#customize-controls",
      responsive: {
          640: {
              items: 1,
          },
          
          768: {
              items: 1,
          }
      }
    };
    tns(config);

    config.container = '.my-slider2';
    config.controlsContainer = "#customize-controls2";
    config.autoplay = false;

    tns2(config);

    config.container = '.my-slider3';
    config.controlsContainer = "#customize-controls3";

    tns3(config);

    config.container = '.my-slider4';
    config.controlsContainer = "#customize-controls4";

    tns4(config);

  },
  computed: {
  }
});
</script>

<style scoped lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css");


.WhyVeganContainer {
  max-width: 768px;
  margin: 0 auto;
  color: #333;
  background-color: #fff;
  overflow-x: hidden;

    article {
      margin: 1em 0;

      .textWrapper {
        overflow: hidden;
        border-top-left-radius: 1%;
        border-top-right-radius: 1%;
        box-shadow: 0 0 4px rgba(0,0,0,.1);
        width: 97vw;
        margin: 0 auto;

        h5 {
          margin: 1em 0;
          padding: 0 10px;
          letter-spacing: .03em;
          line-height: 160%;
        }

        p {
          padding: 0 10px;
          margin: 0 0 1em 0;
          font-size: 0.8em;
          line-height: 160%;
          letter-spacing: .03em;

          &.quote {
            display: block;
            margin: 20px 0 20px 20px;
            padding-left: 20px;
            border-left: 5px solid red;
            font-style: italic;
          }
        }
      }

      .slider-container {    
        padding: .5em 3em;
        margin: 0 auto 0 auto;
        overflow: hidden;
        position:relative;
        background-color: #f1f1f1;
        cursor: grabbing;
        user-select: none;
        overflow-x: hidden;
        box-shadow: 0 0px 10px 0px rgba(0,0,0,.2);
        border-bottom-left-radius: 1%;
        border-bottom-right-radius: 1%;

        .controls, .controls2 {
          margin: 0;
          padding: 0;
          list-style: none;
          position: absolute;
          left: 0;    
          
          width: 100%;    
          top: 50%;
          transform: translatey(-50%);
          display: flex;
          align-items: center;    
          justify-content: space-between;
          li {
            padding: 1em;
            color: white;
            &:hover {
              cursor: pointer;        
              color: #ddd;
            }
            &:focus, &:active {
              outline: 0 !important; 
            }
          }
        }

        .my-slider, .my-slider2, .my-slider3, .my-slider4 {
          position: relative;   

        
          .slider-item {
            background: #f1f1f1;
            position: relative;
            padding: .3em 0;
            &:active {
              transform: scale(99%);
            }
            .card {
              text-align: center;
              vertical-align: center;    
              margin: 0 auto;
              max-width: 90%;    
              height: 10em;   
              color: #333;
              background: #f1f1f1;
              overflow: hidden;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              letter-spacing: .03em;
              line-height: 150%;

              @media (min-width: 480px) {
                height: 8em;
              } 

              i {
                color: #eee;
                padding: 0 0 10px 0;
              }


              h2 {
                  margin: 0 0 .25rem;
                  color: #eee;
              }
              p {
                font-style: italic;
                margin: 0;
                padding: 0 .5rem;
                font-size: .8em;
                color: #eee;
              }

              @media (min-width: 768px) {
                p {
                  font-size: 1em;
                }
              
              } 
            }
          }
        }
      }

    }

  

  
}












</style>
