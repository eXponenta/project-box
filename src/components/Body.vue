<template lang="pug">
  main
    div#content
      template(v-for="section in sections")
        div.title
          TitleBox(:name="section.name")
        component(v-bind:is="section.comp" v-bind:name="section.name")

</template>
<script>
import TitleBox from "./elements/TitleBox";
import ProjectsSection from "./ProjectsSection";
import AboutSection from "./AboutSection";
import ContactsSection from "./ContactsSection";

export default {
  components: {
    AboutSection,
    ProjectsSection,
    ContactsSection,
    TitleBox
  },
  data() {
    return {
      sections: [
        // { name:"About", comp: AboutSection},
        { name: "Projects", comp: ProjectsSection },
        { name: "Contacts", comp: ContactsSection }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./../constants/constants.scss";

main {
  margin: auto;
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

div#content {
  background-color: darken($var-bg-color, 10);
  width: 100%;
  max-width: 600px;
  margin: auto;
}
.title {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-left: 4em;
  margin-bottom: -2em;
  z-index: 1;
}
</style>

