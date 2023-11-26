<template>
  <div class="InfoContainer">
    <section data-aos="fade-right">
      <h1>
        <span>{{ $t('message.privacyPolicy.header') }}</span>
      </h1>
      <div class="sectionText">
        <p>
          {{ $t('message.privacyPolicy.paragraph1') }}
        </p>
        <h2>{{ $t('message.privacyPolicy.header2') }}</h2>
        <p>
          {{ $t('message.privacyPolicy.paragraph2') }}
        </p>
        <h2>{{ $t('message.privacyPolicy.header3') }}</h2>
        <p>
          {{ $t('message.privacyPolicy.paragraph3') }}
        </p>
        <h2>{{ $t('message.privacyPolicy.header4') }}</h2>
        <p>
          {{ $t('message.privacyPolicy.paragraph4') }}
        </p>
        <h2>{{ $t('message.privacyPolicy.header5') }}</h2>
        <p>
          {{ $t('message.privacyPolicy.paragraph5') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Privacy Statement',
  components: {},
});
</script>

<style scoped lang="scss">
@import '../style/variables.scss';
.InfoContainer {
  max-width: 768px;
  margin: 0 auto;
  overflow-x: hidden;
  height: 100vh;

  section {
    font-size: 0.8em;
    border-radius: 3px;
    margin: 1.5em auto;

    &:first-child {
      margin-top: 1em;
    }

    &:last-child {
      margin-bottom: 3em;
    }

    h1 {
      padding: 15px 0;
      box-shadow: 0.32px 2px 4px 0 rgba(0, 0, 0, 0.1);
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
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      width: 97%;
      margin: 0 auto;
      padding: 10px 0;

      h2 {
        padding: 0 10px;
      }

      p {
        padding: 0 10px;
        letter-spacing: 0.03em;
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
          line-height: 160%;
          padding: 0.3em 0;

          a {
            border-right: 2px #333 solid;
            padding: 0.1em 0 0.1em 1em;
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
