<template lang="pug">
    div.carusel
        img.item(v-for="(src, index) in images" :src="src" :alt="'Screenshot' + index")
</template>
<script>
export default {
    props:["images"],
}
</script>
<style lang="scss" scoped>

.carusel {
    width: 100%;
    height: calc(100% - 3em);
    display: flex;
    flex-direction: column;
}
img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
}

</style>
