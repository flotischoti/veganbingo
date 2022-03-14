<template>
  <div class="InfoContainer">
    <div class="articleWrapper" v-for="(info, index) in infos" :key="index">
      <h1 :data-aos="getHeaderEffect">{{$t(`${info.headline}`)}}</h1>

      <article>
        <p v-html="$t(`${info.introduction}`)" class="introduction" data-aos="fade-left"></p>
        <p v-if="index == 0" class="introduction" data-aos="fade-left">
          <label>
            <div class="switch">
              <input type="checkbox" @click="hideLangUnrelated = !hideLangUnrelated">
              <span class="slider round"></span>
            </div>
            <span>{{$t("message.info.section1.hideMediaNote")}}</span>
          </label>
        </p>
        <div class="articleContent">
          <a v-for="(content, index) in filterMedia(info.media)" :key="index" :href="content.url" target="_blank" 
             data-aos="flip-right" :class="{profile: info.type == 'profile'}" :data-aos-delay="calcDelay(index)">
            <section>
              <div class="imageContentContainer">
                <div class="imageContent">
                  <img :src="getImgUrl(content.imgSrc)" :alt="content.altText" :class="{profile: info.type == 'profile'}"/>
                  <span v-if="content.meta">{{content.meta}}</span>
                </div>
              </div>
              <div class="description">
                <h2>{{$t(`${content.title}`)}}</h2>
                <p>{{$t(`${content.description}`)}}</p>
              </div>
            </section>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { infos, media } from "../assets/info"
import Aos from 'aos';

export default defineComponent({
  name: 'Info',
  data() {
    return {
      infos,
      hideLangUnrelated: false,
    }
  },
  components: {

  },
  methods: {
    calcDelay(position: number) {
      let pos = position + 1;
      let mod = window.innerWidth < 480 ? 2 : window.innerWidth < 768 ? 3 : 4;
      return pos % mod == 1 ? 0 : pos % mod == 2 ? 300 : pos % mod == 3 ? 600 : (mod - 1) * 300;
    },
    getImgUrl(name: string) {
      var images = require.context('../assets/', false);
      return images('./' + name);
    },
    filterMedia(media: media[]):media[] {
      return media.filter(m => !this.hideLangUnrelated || m.lang.includes(this.$i18n.locale.substring(0,2)));
    }
  },
  mounted() {
    document.querySelectorAll('img').forEach(img => img.addEventListener('load', ()=>Aos.refresh()));
    document.querySelectorAll('h1').forEach(h1 => h1.addEventListener('load', ()=>Aos.refresh()));
  },
  computed: {
    getHeaderEffect() {
      return window.innerWidth > 480 ? 'fade-right' : '';
    },
  }
});
</script>

<style scoped lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css");

$slider-color: hsl(319, 100%, 47%);

.InfoContainer {
  max-width: 768px;
  margin: 0 auto;
  color: #333;
  background-color: #fff;
  

  div.articleWrapper:last-child {
    margin-bottom: 20px;
  }

  div.articleWrapper:not(:first-child) h1 {
    margin: 1em 0 0 0;
  }

  div.articleWrapper:first-child h1 {
    margin: 0 0 0 0;
  }

  div.articleWrapper {
    h1 {
      position: sticky;
      top: 0px;
      padding: 15px 10px 15px 10px;
      z-index: 100;
      box-shadow: 0 10px 10px -10px rgba(0,0,0,.2);
      background-color: #fff;
      letter-spacing: 13px;
      font-size: 1.5em;
    }

    article {
      overflow-x: hidden;

      h5 {
        padding: 0 10px;
        letter-spacing: .03em;
        line-height: 160%;
      }

      p.introduction {
        padding: 10px;
        color: rgba($color: #000000, $alpha: .8);
        margin: 5px 0;
        font-size: 0.8em;
        line-height: 160%;
        letter-spacing: .03em;
      }


      label {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        
        .switch {
          position: relative;
          display: inline-block;
          width: 2.4em;
          height: 1.4em;
          margin-right: .5em;
          overflow-x: scroll;

          input { 
            opacity: 0;
            width: 0;
            height: 0;

            &:checked + .slider {
              background-color: $slider-color;
            }

            &:checked + .slider:before {
              -webkit-transform: translateX(1em);
              -ms-transform: translateX(1em);
              transform: translateX(1em);
            }
          }
          .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;

            &.round {
              border-radius: 2em;

              &:before {
                border-radius: 50%;
              }
            }

            &:before {
              position: absolute;
              content: "";
              height: 1em;
              width: 1em;
              left: .2em;
              bottom: .2em;
              background-color: white;
              -webkit-transition: .4s;
              transition: .4s;
            }
          }
        }
      }

      .articleContent {
        padding: 0 10px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        position: relative;
        a {
          width: 48%;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
          text-decoration: none;
          color: #333;
          &:hover {
            transition: box-shadow .3s, transform 0.1s;
            box-shadow: 0 0px 10px 1px rgba(0, 0, 0, .3), 0 0px 10px 1px rgba(0, 0, 0, .3);
            transform: scale(100.5%);
          }

          &.profile {
            padding-top: 15px;
          }

          section {
            .imageContentContainer{ 
              
              .imageContent {
                
                display: flex;
                justify-content: center;
                position: relative;

                img {
                  max-width: 100%;
                  aspect-ratio: 2/3;
                  object-fit: fit;
                  height: auto;
                  align-self: flex-start;

                  &.profile {
                    width: 70%;
                    aspect-ratio: 1;
                    border-radius: 50%;
                  }

                }

                span {
                  position: absolute;
                  color: white;
                  background-color: rgba($color: #333, $alpha: .6);
                  padding: .3em;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                  font-size: .6em;
                  bottom: .5em;
                  left: .5em;
                }
              }

            }

            .description {
              padding: 10px 20px;
              h2 {
                font-size: 1.2em;
                margin: 5px 0 0 0;
                letter-spacing: .03em;
              }

              
              p {
                color: rgba($color: #000000, $alpha: .8);
                margin: 5px 0;
                font-size: 0.8em;
                line-height: 130%;
                letter-spacing: .03em;
              }
            }
            
          }
        }



        

        @media (min-width: 480px) {
          .articleContent {
            justify-content: space-evenly;
          
          }
          a {
            width: 32%;
          }
        
        } 
        @media (min-width: 768px) {
          .articleContent {
            justify-content: space-evenly;
          
          }
          a {
            width: 23%;
          }
        
        } 
        
      }
    }
  }

  

  
}

</style>
