<template>
  <div class="InfoContainer">
    <section data-aos="fade-right">
      <h1><span>{{$t('message.about.whyBingo.header')}}</span></h1>
      <div class="sectionText">
        <p>{{$t('message.about.whyBingo.paragraph1')}}</p>
        <p>{{$t('message.about.whyBingo.paragraph2')}}</p>
        <p>{{$t('message.about.whyBingo.paragraph3part1')}}<br>{{$t('message.about.whyBingo.paragraph3part2')}}</p>
        <p>{{$t('message.about.whyBingo.paragraph4')}}</p>
        <p><span class="quote">{{$t('message.about.whyBingo.paragraph5')}}</span></p>
      </div>
    </section>
    <section data-aos="fade-left">
      <h1><span>{{$t('message.about.sources.header')}}</span></h1>
      <div class="sectionText">
        <p>
          {{$t('message.about.sources.paragraph1')}}
        </p>
      </div>
    </section>
    <section data-aos="fade-left">
      <h1><span>{{$t('message.about.supporter.header')}}</span></h1>
      <div class="sectionText">
        <p>
          {{$t('message.about.supporter.paragraph1')}}
        </p>
        <ul>
          <li>
            <a href="https://twitter.com/Samanthosss" target="_blank" class="fa fa-twitter"><span>Samanthosss</span></a>
            <span>{{$t('message.about.supporter.taskEnglish')}}</span>
          </li>
          <li>
            <a href="https://www.instagram.com/marlonprofuss/" target="_blank" class="fa fa-instagram"><span>marlonprofuss</span></a>
            <span>{{$t('message.about.supporter.taskEnglish')}}</span>
          </li>
          <li>
            <a class="fa fa-female"><span> {{$t('message.about.supporter.sMama')}}</span></a>
            <span>{{$t('message.about.supporter.taskProofreading')}}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  components: {},
});
</script>

<style scoped lang="scss">
.InfoContainer {
  max-width: 768px;
  margin: 0 auto;
  overflow-x: hidden;

  section {
    font-size: .8em;
    border-radius: 3px;
    margin: 1.5em auto;

    &:last-child {
      margin-bottom: 3em;
    }

    h1 {
      padding: 15px 0;
      box-shadow: .32px 2px 4px 0 rgba(0,0,0,.1);
      letter-spacing: 13px;
      font-size: 1.5rem;
      border-radius: 3px;
      margin: 0 auto;
      width: 100%;

      span {
        display: inline-block;
        padding: 0 10px;
      }

      @media (min-width: 768px) {
        width: 99.5%;
      }
    }

    .sectionText {
      box-shadow: 0 0 4px rgba(0, 0, 0, .1);
      width: 97%;
      margin: 0 auto;
      padding: 10px 0;

      p {
        padding: 0 10px;
        letter-spacing: 0.03em;
        color: #333;
        text-align: justify;
        line-height: 160%;
        

        .quote {
          display: block;
          margin: 20px 0;
          padding-left: 20px;
          border-left: 5px solid red;
        }
      }

      ul {
        list-style: none;
        text-indent: 0;
        padding: 0 10px;
        li {
          display: block;
          letter-spacing: 0.03em;
          color: #333;
          line-height: 160%;
          padding: 0.3em 0;

          a {
            border-right: 2px #333 solid;
            padding: .1em 0 .1em 1em;
            text-decoration: none;

            span {
              display: inline-block;
              width: 7em;
              padding-left: 0.2em;
            }
          }

          span {
            padding: 0 1em;
            
          }
        }
      }
    }
  }
}
</style>
