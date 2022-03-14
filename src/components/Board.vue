<template>
  <div class="container">
    <div class="boardContainer">
      <div class="title" :class="{bingo: bingo && !tooSmall}">
        <span>B</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>O</span>
      </div>
      <div ref="board" class="board" :key="boardKey">
        <Field v-for="(f, index) in fields" 
          class="field"
          :class="{active: fadeIn && selectedField == f}"
          :key="f.id" 
          :field="f"
          :updateTrigger="boardKey"
          @selectField="handleSelection"
          @release="handleMouseup(index)"
          @shuffle="showShufflePopup = true"
          v-show="!tooSmall"/>
        <div class="confettiContainer" v-if="bingo && !tooSmall">
          <div v-for="n in 10" :key="n" class="confetti"></div>
        </div>
      </div>
      <div class="controls" v-if="!tooSmall">
        <div class="instructions">
          <span>{{ $t("message.board.controls.clickToTick") }}</span>
          <span>{{ $t("message.board.controls.holdForInfo") }}</span>
        </div>
        <div class="actions">
          <i class="fa fa-share-alt" aria-hidden="true" :title="$t('message.board.popup.share.title')" @click="showSharePopup = true"></i>
          <button class="shuffle" @click="showShufflePopup = true">{{ $t("message.board.controls.newBoard") }}</button>
        </div>
      </div>
      <ModalBox 
        v-if="!tooSmall"
        :field="selectedField"
        :show="showInfoBox"
        @close="showInfoBox = false"
        @copy="copyText"/>
      <ConfirmationPopup 
        v-if="!tooSmall"
        :show="showShufflePopup"
        :confirmButtons="true"
        :title="$t('message.board.popup.shuffle.title')" 
        @cancel="showShufflePopup = false"
        @confirm="userShuffleFields">
        <span>{{$t('message.board.popup.shuffle.text')}}</span>
        <a class="popupTextLink" @click="navigate">{{$t('message.board.popup.shuffle.text2')}}</a>
        <span>{{$t('message.board.popup.shuffle.text3')}}</span>
      </ConfirmationPopup>
      <ConfirmationPopup 
        v-if="!tooSmall"
        :show="showSharePopup"
        :confirmButtons="false"
        :copyButton="true"
        :title="$t('message.board.popup.share.title')" 
        @cancel="showSharePopup = false"
        @copy="copy">
        <span v-html="$t('message.board.popup.share.text')"/>
      </ConfirmationPopup>
      <Toast
        v-if="!tooSmall"
        :text="toastMessage"
        :show="showToast"
      />
    </div>
    <div class="warning" v-if="tooSmall">
      {{ $t("message.board.tooSmall")  }}
    </div>
    <div class="gradient">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Field from './Field.vue';
import ModalBox from './ModalBox.vue';
import ConfirmationPopup from './ConfirmationPopup.vue';
import Toast from './Toast.vue';
import { allFields, fieldType } from '../assets/data';

export default defineComponent({
  name: 'Board',
  components: {
    Field,
    ModalBox,
    ConfirmationPopup,
    Toast,
  },
  data() {
    return {
      fadeIn: false,
      fadeOut: false,
      fields: [] as fieldType[],
      middleField: {
        id: 0,
        selected: false,
        title: '',
        selectable: false,
      } as fieldType,
      selectedField: {} as fieldType,
      bingo: false,
      rows: new Map(),
      columns: new Map(),
      ltrDiagonal: 0,
      rtlDiagonal: 0,
      tooSmall: false,
      boardKey: 0,
      showShufflePopup: false,
      showSharePopup: false,
      showToast: false,
      toastMessage: '',
      fieldPressedAt: new Date(),
      showInfoBox: false,
    }
  },
  methods: {
    userShuffleFields() {
      this.shuffleFields();
      this.showShufflePopup = false;
      this.boardKey++;
    },
    shuffleFields() {
      this.fields = allFields.sort(() => .5 - Math.random()).slice(0, 24);
      this.fields.forEach(f => f.selected = false);
      this.resetBingo();
    },
    resetBingo() {
      this.fields = [...this.fields.slice(0,12), this.middleField, ...this.fields.slice(12)];
      Array.from(Array(5)).forEach((x, i) => {
        this.rows.set(i, 0);
        this.columns.set(i, 0);
      })
      this.ltrDiagonal = 0;
      this.rtlDiagonal = 0;
      this.bingo = false;
    },
    handleSelection(field: fieldType) {
      this.fieldPressedAt = new Date();
      this.selectedField = field;
      this.showInfoBox = true;
    },
    handleMouseup(index: number) {
      let pressDuration = new Date().getTime() - this.fieldPressedAt.getTime();
      if (pressDuration < 500 && index >= 0) {
        this.selectedField.selected = !this.selectedField.selected;   
        this.checkBingo(this.selectedField, index);
        this.showInfoBox = false;
      }
    },
    checkBingo(field: fieldType, index: number) {
      let column = index % 5;
      let row = Math.floor(index/5);

      if (field.selected) {
        this.rows.set(row, this.rows.get(row) + 1);
        this.columns.set(column, this.columns.get(column) + 1);
        if (row == column) {
          ++this.ltrDiagonal
        } else if (row + column == 4) {
          ++this.rtlDiagonal;
        }
      } else {
        this.rows.set(row, this.rows.get(row) - 1);
        this.columns.set(column, this.columns.get(column) - 1);
        if (row == column) {
          --this.ltrDiagonal
        } else if (row + column == 4) {
          --this.rtlDiagonal;
        }
      }
      for (let i = 0; i < 5; i++) {
        if (this.rows.get(i) == 5 || (i == 2 && this.rows.get(i) == 4) || this.columns.get(i) == 5 || (i == 2 && this.columns.get(i) == 4) || this.ltrDiagonal == 4 || this.rtlDiagonal == 4) {
          this.bingo = true;
          return;
        }
        this.bingo = false;
      }
    },
    checkFieldSize() {
      let board: HTMLElement = this.$refs.board as HTMLElement;
      this.tooSmall = board.offsetWidth < 320 || window.innerHeight < (320 + 64 + 73 + 41);
    },
    initBoardFromUrl(): boolean {
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.has('fields'))  {
        return false;
      }

      const fields = urlParams.get('fields')?.split(',').filter(s => s).map(s => Number(s));
      if (!Array.isArray(fields) || fields.length != 24 || this.hasIllegalContent(fields, 1, allFields.length)) {
        this.toast(this.$t('message.board.toast.initError'));
        return false;
      }
        
      fields.forEach(f => {
        let tempField = allFields.find(af => af.id == f);
        if (tempField) {
          this.fields.push(tempField);
        }
      })
      this.resetBingo();

      if (urlParams.has('selected')) {
        const selected = urlParams.get('selected')?.split(',').filter(s => s).map(s => Number(s));
        if (!selected || !Array.isArray(selected) || selected.length < 0 || selected.length >= 25 || this.hasIllegalContent(selected, 0, 24) ) {
          this.toast(this.$t('message.board.toast.initError'));
          return false;
        }
        selected.forEach(i => {
          this.fields[i].selected = true;
          this.checkBingo(this.fields[i], i);
        })
      }
      this.$emit('initialized');
      return true;
    },
    hasIllegalContent(array: number[], minNumber: number, maxNumber: number): boolean{
      return array.some((element, index) => {
        return array.indexOf(element) !== index || element < minNumber || element > maxNumber
      });
    },
    copy() {
      this.showSharePopup = false;
      navigator.clipboard.writeText(this.getUrl);
      this.toast(this.$t('message.board.toast.urlCopied'));
    },
    copyText() {
      this.showInfoBox = false;
      this.toast(this.$t('message.board.toast.textCopied'));
    },
    toast(text: string) {
      this.toastMessage = text;
      if (!this.showToast) {
        setTimeout(() => this.showToast = false, 3000);
      }
      this.showToast = true;
    },
    navigate() {
      this.showShufflePopup = false;
      this.$emit('navigate', 'List');
    }
  },
  emits: {
    initialized: null,
    navigate: null
  },
  mounted() {
    this.checkFieldSize();
    window.onresize = this.checkFieldSize;
    if (!this.initBoardFromUrl()) {
      this.shuffleFields();
    }
  },
  activated() {
    this.boardKey = 0;
    this.checkFieldSize();
  },
  computed: {
    getUrl(): string {
      let fields = 'fields=' + this.fields.filter(f => f.id > 0).map(f => f.id).join(',');
      let selected = 'selected=' + this.fields.map((f, i) => { return {f, i}}).filter(o => o.f.selected).map(o => o.i).join(',');
      let port = window.location.port;
      return window.location.hostname + (port ? ':'+port : '') + '/?' + fields + '&' + selected;
    }
  }
}); 
</script>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap');

$background: rgb(254, 205, 4);
$B: hsl(0, 100%, 50%);
$I: rgb(254,154,0);
$N: rgb(147, 210, 79);
$G: rgb(83, 141, 214);
$O: rgb(227, 12, 131);
$actionColor: hsla(0, 50%, 40%, 1);
$actionColorHover: hsla(0, 50%, 50%, 1);

@mixin random-bgr(){
  border: 1px solid rgb(random(255), random(255), random(255));
}

.container {
  max-width: calc((100vh - 64px - 56px - 41px));
  margin: 0 auto;
  overflow: hidden;
  height: calc(100vh - 4rem);
  background-color: $background;

  @media (min-width: 380px) and (min-height: calc(380px + 64px + 73px + 47px)){
    max-width: calc((100vh - 64px - 73px - 47px));
  }


  @media (min-width: 480px) and (min-height: calc(480px + 64px + 100px + 53px)){
    max-width: calc((100vh - 64px - 100px - 53px));
  }

  .boardContainer {
    position: relative;
    .title {
      width: 100%;
      padding: 0;
      z-index: 100;
      
      display: flex;
      justify-content: space-around;
      user-select: none;

      &.bingo {
        animation: glow 1s ease-in-out infinite alternate;
      }

      span {
        
        font-family: "Mochiy Pop P One", sans-serif;
        font-size: 2rem;
        width: 20%;
        text-align: center;
        font-weight: bold;
        padding: 5px;
        border-radius: 5%;

        @media (min-width: 380px) and (min-height: calc(380px + 64px + 73px + 47px))  {
          & {
            font-size: 2.5rem;
            padding: 8px;
          }
        }
        
        @media (min-width: 480px) and (min-height: calc(480px + 64px + 100px + 53px))  {
          & {
            font-size: 3.45rem;
            padding: 10px;
          }
        }

        &:nth-child(1) {
          color: white;
          transform: rotate(-5deg);
          background-color: $B;
        }

        &:nth-child(2) {
          color: white;
          background-color: $I;
          transform: rotate(5deg);
        }

        &:nth-child(3) {
          background-color: $N;
          color: white;
          
        }

        &:nth-child(4) {
          background-color: $G;
          color: white;
          transform: rotate(5deg);
        }

        &:nth-child(5) {
          background-color: $O;
          color: white;
          transform: rotate(-5deg);
        }

      }

    }

    .board {
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, minmax(18%, 1fr));
      gap: .2em;
      padding: 7px;
      justify-content: center;

      .confettiContainer {
        width: 100%;
        height: 100%;
        position: absolute;

        .confetti {
          z-index: 150;
          width: 15px;
          height: 15px;
          background-color: #f2d74e;
          position: absolute;
          left: 50%;
          animation: confetti 5s ease-in-out -2s infinite;
          transform-origin: left top;

          &:nth-child(1) {
            background-color: #f2d74e; left: 10%; animation-delay: 0;
          }
          &:nth-child(2) {
            background-color: #95c3de; left: 20%; animation-delay: -5s;
          }
          &:nth-child(3) {
            background-color: #ff9a91; left: 30%; animation-delay: -3s;
          }
          &:nth-child(4) {
            background-color: #f2d74e; left: 40%; animation-delay: -2.5s;
          }
          &:nth-child(5) {
            background-color: #95c3de; left: 50%; animation-delay: -4s;
          }
          &:nth-child(6) {
            background-color: #ff9a91; left: 60%; animation-delay: -6s;
          }
          &:nth-child(7) {
            background-color: #f2d74e; left: 70%; animation-delay: -1.5s;
          }
          &:nth-child(8) {
            background-color: #95c3de; left: 80%; animation-delay: -2s;
          }
          &:nth-child(9) {
            background-color: #ff9a91; left: 90%; animation-delay: -3.5s;
          }
          &:nth-child(10) {
            background-color: #f2d74e; left: 100%; animation-delay: -2.5s;
          }
        }
      }

    }

    .controls {
        padding: .3em .5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .instructions {
          user-select: none;
          span {
            letter-spacing: .03em;
            color: $actionColor;
            font-size: .56em;
            font-weight: bold;
            display: block;
            line-height: 140%;
            @media (min-width: 380px) and (min-height: calc(380px + 64px + 73px + 47px))  {
              line-height: 150%;
              font-size: .65em;
            } 
            
            @media (min-width: 480px) and (min-height: calc(480px + 64px + 100px + 53px))  {
              line-height: 150%;
              font-size: .75em;
            } 
          }
        }

        .actions {
          z-index: 100;
          display: flex;
          align-items: center;

          i {
            color: $actionColor;
            padding: 0 .8em;
            font-size: 1em;
            cursor: pointer;
            user-select: none;
            outline: none;
            border: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);


            @media (min-width: 380px) and (min-height: calc(380px + 64px + 73px + 47px))  {
              font-size: 1.15em;
            }

            @media (min-width: 430px) and (min-height: calc(430px + 64px + 73px + 47px)) {
              font-size: 1.3em;
            }

            &:hover {
              color: $actionColorHover;
            }

            &:active {
              transform: scale(0.98);
            }

          }

          button {
            padding: .7em;
            cursor: pointer;
            letter-spacing: .05em;
            color: white;
            border: none;
            background: $actionColor;
            outline: none;
            user-select: none;
            transition: 0.05s all;
            font-size: .6em;
            white-space:nowrap;
            -webkit-tap-highlight-color: rgba(0,0,0,0); // For stupid Safari/Chrome to avoid blue highlight
            text-transform: uppercase;
            border-radius: 5%;

            @media (min-width: 380px) and (min-height: calc(380px + 64px + 73px + 47px))  {
              font-size: .7em;
            }

            @media (min-width: 430px) and (min-height: calc(430px + 64px + 73px + 47px)) {
              font-size: .8em;
            }

            &:hover {
              background-color: $actionColorHover;
            }

            &:active {
              transform: scale(0.98);
            }
          }
        }
      }
  }

  .gradient {
      height: 100%;
      background-image: linear-gradient(to bottom, $background, hsla(319, 100%, 47%, 0.5));
      padding: 0;
      
    }
  
  .warning {
    padding: 10px;
    line-height: 130%;
    letter-spacing: .03em;
  }
}

.popupTextLink {
  text-decoration: underline;
  cursor: pointer;
}

@keyframes confetti {
  0% { transform: rotateZ(15deg) rotateY(0deg) translate(0,0); }
  25% { transform: rotateZ(5deg) rotateY(360deg) translate(-5vw,20vh); }
  50% { transform: rotateZ(15deg) rotateY(720deg) translate(5vw,60vh); }
  75% { transform: rotateZ(5deg) rotateY(1080deg) translate(-10vw,80vh); }
  100% { transform: rotateZ(15deg) rotateY(1440deg) translate(10vw,110vh); }
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e6bc00, 0 0 20px #e6bc00, 0 0 25px #e6bc00, 0 0 30px #e6bc00, 0 0 35px #e6bc00;
  }
  
  to {
    text-shadow: 0 0 10px #fff, 0 0 15px #fff34d, 0 0 20px #fff34d, 0 0 25px #fff34d, 0 0 30px #fff34d, 0 0 35px #fff34d, 0 0 40px #ff4da6;
  }
}

</style>
