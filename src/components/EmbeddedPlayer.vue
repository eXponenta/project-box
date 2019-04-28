<template lang="pug">
  div.overlay(:class= "{active:isOpened}" v-if="isOpened")
    div.loader(:style="backgroundStyle" v-on:click.self="close")
      //div.bg(:style="backgroundStyle")
      //div.progress LOADING
    div.player(ref="player_block")
      div.controlls
        div.name {{item.name}}
        div.full.button.i(v-on:click="full")
        div.close.button.i(v-on:click="close")
      iframe(:class="{hidden: !isShowed}" v-if="mode==='iframe'" v-bind:src="item.live" @load.passive="loaded")
</template>
<script>
import TitleBox from "./elements/TitleBox";

export default {
  components: {
    TitleBox
  },
  data() {
    return {
      isOpened: false,
      isShowed: false,
      mode: "iframe",
      item: {},
      backgroundStyle: {}
    };
  },
  created() {
    this.$root.$on("openFullscreen", this.open);
    this.$root.$on("closeFullscreen", this.close);
  },
  methods: {
    open(params) {
      if (!params) return;
      if (this.isOpened)
        throw new Error("Player already open. Close before reopening!");
      if (!params.item) throw new Error("Item is undef!");

      this.mode = params.mode || "iframe";
      if (this.mode == "iframe" && !params.item.live)
        throw new Error("item.live cant't be undef in iframe mode!");

      this.item = params.item;
      this.backgroundStyle = {};
      if (this.item.images && this.item.images[0])
        this.backgroundStyle["background-image"] = `url(${
          this.item.images[0]
        })`;

      this.$emit("open", { player: this, from: params.from });
      this.isOpened = true;
    },
    close(params) {
      this.isOpened = false;
      this.isShowed = false;
      if (document.fullscreenElement) document.exitFullscreen();
      this.$emit("close", { player: this, from: params.from });
    },
    full() {
      if (!isShowed) return;
      if (!document.fullscreenElement) {
        this.$refs.player_block.requestFullscreen().catch(err => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${
              err.name
            })`
          );
        });
      } else {
        document.exitFullscreen();
      }
    },
    loaded() {
      //show trotling
      setTimeout(() => {
        if (this.isOpened) this.isShowed = true;
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../constants/constants.scss";

.overlay {
  display: none;
  position: fixed;
  width: 100%;
  //fucked chrome on mobile
  height: 100%;
  padding-bottom: 70px;
  top: 0;
  left: 0;
  z-index: 999999;
  justify-content: stretch;
  align-content: stretch;
  background-color: rgba($color: #000000, $alpha: 0.6);

  .loader {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;

    filter: blur(5px) grayscale(0.6);
    opacity: 0.5;
  }

  &.active {
    display: flex;
  }
}
.player {
  width: 80%;
  height: 80%;
  margin: auto;
  margin-bottom: auto;
  position: relative;
  background-color: rgba($color: #000, $alpha: 0.2);

  .hidden {
    visibility: hidden;
  }

  iframe {
    border: none;
    width: 100%;
    height: calc(100% - 2em);
    overflow: hidden;
  }
  .controlls {
    position: relative;
    display: flex;
    width: 100%;
    font-size: 1.5em;
    font-weight: bold;
    height: 2em;
    line-height: 2em;
    z-index: 2;
    background-color: $var-main-header-color;
    color: $var-title-text-color;

    div {
      height: 100%;
      text-transform: uppercase;
    }
    .name {
      margin-left: 0.25em;
      word-break: break-all;
      overflow: hidden;

      &::first-letter {
        color: $var-burger-color;
        margin-right: 2px;
        font-size: 1.125em;
      }
    }
    .button {
      width: 3em;
      text-align: center;
      cursor: pointer;

      &.i {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
      }
      &:hover {
        background-color: $header-hover-color;
      }
      &.close::before {
        content: "\f00d";
      }
      &.full {
        margin-left: auto;
        &::before {
          content: "\f2d0";
        }
      }
    }
  }
  &:fullscreen .controlls {
    .full::before {
      content: "\f2d1";
    }
  }
}
</style>
