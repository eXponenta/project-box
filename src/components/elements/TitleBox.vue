<template lang="pug">
  div.title-box(:class='[hoverMode]')
    div.title(:style="style")
      div.label {{name}}
    div.shadow
      div.label {{name}}
</template>
<script>
export default {
  props: {
    name: String,
    textColor: {
      default: ""
    },
    bodyColor: {
      default: ""
    },
    bodyColorDisabled: {
      default: ""
    },
    hoverMode: {
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        "background-color": this.bodyColor,
        color: this.textColor
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../constants/constants.scss";

$var-width: 200px;
$var-height: 2em;
$var-width-hover: 250px;

.title-box {
  width: $var-width;
  height: $var-height;
  flex-direction: row-reverse;
  margin-right: 0px;
  transition: all 0.2s linear;

  font-size: $var-height;
}

.label {
  width: 100%;
  transition: all 0.15s linear;
  margin: auto 0;
}

.title-box:hover,
.title-box.hover {
  &.left {
    cursor: pointer;
    margin-right: $var-height;
    transition: all 0.2s linear;
    .label {
      margin-left: -40px;
      transition: all 0.15s linear;
    }
  }
  &.top {
    cursor: pointer;
    width: $var-width * 1.5;
    height: $var-height * 1.5;
    transition: all 0.15s linear;
  }
}

.title {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 10;
  transition: width 0.2s linear;

  /*ovverids by sprops*/
  background-color: rgb(105, 23, 23);
  color: $var-main-text-color;
}

.shadow {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  /*margin-bottom: -$var-height;*/
  background-color: black;
  transform: skewX(45deg) scaleY(-0.5);
  transform-origin: top;
  opacity: 0.6;
  transition: width 0.2s linear;
  .label {
    color: black;
    transform: scaleY(-1);
  }
}
</style>



