<template lang="pug">
  section(v-bind:id="name") About
</template>
<script>
export default {
  props: ["name"],
  data() {
    return {};
  },
  components: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
section {
  color:white;
}
</style>
