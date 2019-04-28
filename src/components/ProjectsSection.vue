<template>
  <section class="project-section" :id="name">
    <div class="items">
      <ProjectItem v-for="item in items" :key="item.id" :item="item" class="item"/>
    </div>
  </section>
</template>
<script>
import ProjectItem from "./elements/ProjectItem";

export default {
  props: ["name"],
  data() {
    return {
      items: []
    };
  },
  components: {
    ProjectItem
  },
  created() {
    fetch("./projects.json")
      .then(e => {
        return e.json();
      })
      .then(json => {
        this.items = json;
      });
  }
};
</script>
<style lang="scss" scoped>
@import "../constants/constants.scss";

.items {
  background-color: darken($var-bg-color, 20);
  padding: 2em 0;

  .item {
    margin-bottom: 2em;
  }
}
.project-section {
  color: #d7d7d8;
}
</style>
