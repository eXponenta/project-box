<template>
  <header>
    <div class="title">
      <div class="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
        <span class="login" @click = "goGithub">Xponenta</span>
        <span class="logo-github" @click = "goGithub"></span>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    goGithub() {
      window.open('https://github.com/eXponenta', '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../constants/constants.scss";

.title {
  padding: 0 4em;
  display: flex;
  align-items: baseline;
}

.logo-github {
  align-self: center;
  margin-left: auto;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  background-image: url('https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg');

  cursor: pointer;
}


.login {
  font-size: 2em;
  font-weight: bolder;
}

.burger {
  width: 20px;
  height: 1.5em;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  margin: 10px 2px 10px 10px;
  border-left: 4px solid $var-burger-color;
  transition: all 0.15s linear;
  div {
    background-color: $var-main-text-color;
    height: 5px;
    width: 20px;
    margin-left: auto;
  }
}
.title:hover {
  cursor: pointer;
  .burger {
    width: 30px;
    margin: 10px;
    transition: all 0.15s linear;
  }
}

header {
  color: $var-main-text-color;
  height: 4em;
  width: 100%;
  line-height: 4em;
  background-color: $var-main-header-color;
  position: fixed;
  top: 0px;
  z-index: 111;
}

.navigation {
  ul {
    display: inline-flex;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: 0;
  }
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .title {
    padding: 0;
  }
}
</style>

