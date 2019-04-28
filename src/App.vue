<template>
  <div id="app">
    <svg width="0" height="0" class="filter">
      <defs>
        <filter id="svg-blur">
          <feGaussianBlur stdDeviation="3" in="SourceColor"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
    <div id="wrapp" :class="{blured:isPlayerOpened}">
      <Header/>
      <Body ref="body"/>
    </div>
    <EmbeddedPlayer ref="player"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Body from "./components/Body";
import EmbeddedPlayer from "./components/EmbeddedPlayer";

export default {
  name: "App",
  data() {
    return {
      isPlayerOpened: false
    };
  },
  components: {
    Header,
    Body,
    EmbeddedPlayer
  },
  mounted() {
    this.$refs.player.$on("open", e => {
      this.isPlayerOpened = true;
      document.body.classList.add("non-scroll");
    });
    this.$refs.player.$on("close", e => {
      this.isPlayerOpened = false;

      document.body.classList.remove("non-scroll");
    });
  }
};
</script>

<style lang="scss">
@import "./constants/constants.scss";

html,
body {
  margin: 0px;
  width: 100%;
}

body {
  overflow-x: hidden;
  &.non-scroll {
    overflow: hidden;
  }
}

.filter {
  position: absolute;
}

.blured {
  filter: url(#svg-blur);
  overflow: hidden;
  pointer-events: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $var-bg-color;
}
</style>
