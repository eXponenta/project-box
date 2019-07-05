<template lang="pug">
  div.item-container
    TitleBox.item-name(:name="item.name" hoverMode="")
    div.item-body
      div.item-box
        div.item-images.item(:style='bgImage' @click="openPreviewImage(item)")
        //  img(v-bind:src='item.images[0]')
        div.item-text.item
          div.item-desription {{item.description}}
          div.item-tags
            div.tag-title-cont
                span.tag-title Tags :
            span(v-for="tag in item.tags") {{tag}}
      div.buttons
        TitleBox.live.button(
          :class="{active:item.live}"
          v-bind:hoverMode="item.live ? 'top' : 'none'"
          name="Preview"
          bodyColor="#4652db"
          @click.native="openPreviewLive(item)"
          )
        TitleBox.github.button(
          :class="{active:item.github}"
          v-bind:hoverMode="item.github ? 'top' : 'none'"
          name="GitHub"
          bodyColor="#333"
          @click.native="openLink(item.github)"
        )
        TitleBox.link.button(
          :class="{active:item.link}"
          v-bind:hoverMode="item.link ? 'top' : 'none'" 
          name="Link"
          bodyColor="#f47721"
          @click.native="openLink(item.link)"
        )
        

</template>
<script>
import TitleBox from "./TitleBox";

export default {
  props: ["item"],
  components: {
    TitleBox
  },
  data() {
    return {
      bgImage: {}
    };
  },
  mounted() {
    this.bgImage = {
      "background-image": `url(${this.item.images[0]})`
    };
  },
  methods: {
    openLink(lnk) {
      if (lnk) {
        window.open(lnk, "_blank");
      }
    },
    
    openPreviewImage(item) {
      this.$router.push("image/" + item.id);
    },
    
    openPreviewLive(item) {
      this.$router.push("live/" + item.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../constants/constants.scss";

$var-project-title-height: 1.5em;
$var-project-button-height: 1.25em;

.item-container {
  display: block;
  margin: 0px 20px;
}

.item-body {
  padding: 2em 20px 0px 20px;
  margin: 0 20px;
  background-color: darken($var-bg-color, 10);
}

.item {
  margin: 0 auto;
}
.item-box {
  display: flex;
}

.item-images {
  min-width: 200px;
  min-height: 200px;
  width: 200px;
  height: 200px;
  box-shadow: -3px 2px 0px 1px rgba(#000000, 0.6);
  background-position: center;
  background-size: cover;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 15px;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: relative;
    background-color: darken($var-bg-color, 10);
  }
  &::before {
    top: 15px;
    left: 15px;
  }
  &::after {
    left: calc(100% - 15px);
    top: calc(100% - 25px);
  }
}

.item-text {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item-desription {
    white-space: pre-wrap;
    margin-bottom: 1em;
    text-align: justify;
  }
}
.item-name {
  width: 200px !important;
  height: $var-project-title-height !important;
  line-height: $var-project-title-height !important;
  font-size: $var-project-title-height !important;
  margin-left: $var-project-title-height * 0.75 + 0.5em;
  margin-bottom: -$var-project-title-height * 0.5;
}
.item-tags {
  margin-bottom: 0px;
  display: inherit;
  flex-wrap: wrap;

  span {
    display: inline-block;
    margin: 0px 4px 4px 4px;
    padding: 4px;
    text-align: center;
    min-width: 4em;
    background-color: #84bd00;
    color: #00205b;
    flex: auto;
  }

  .tag-title-cont {
    width: 100%;
  }
  .tag-title {
    display: block;
    background-color: #146eb4;
    width: 2em;
    color: #ccc;
    font-weight: bold;
  }
}

img {
  max-width: 100%;
}

.buttons {
  display: flex;
  width: calc(100% + 1.2em);
  flex-direction: row;
  justify-content: space-around;
  margin-left: -1.25em;

  .button {
    position: relative;
    height: $var-project-button-height;
    font-size: $var-project-button-height !important;
    margin-left: $var-project-button-height * 0.5;
    text-align: center;
    bottom: -$var-project-button-height * 0.5;

    &.active:hover {
      height: $var-project-button-height * 1.5;
      width: 300px;
      bottom: -$var-project-button-height * 0.75;
      margin-top: -$var-project-button-height * 0.5;
      margin-left: $var-project-button-height * 0.75;
    }
  }
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .item-container {
    margin-top: 1em;
  }
  .item-box {
    flex-direction: column;
  }
  .item-name {
    width: calc(100% - #{$var-project-title-height}) !important;
    margin-left: $var-project-title-height * 0.5;
  }
  .item-body {
    margin: 0px;
  }
  .item-images {
    width: 100%;
  }
  .item-text {
    margin: 20px 0;
  }
  .item-tags > .tag-title-cont {
    width: auto;
  }
}
</style>
<style lang="scss">
.button {
  &:not(.active) {
    .title {
      background-color: #aaa !important;
      color: #ccc !important;
      opacity: 0.8;
    }
  }
}
</style>

