<template lang="pug">
    swiper.carousel(:options = "sOptions")
        template(v-for="(src, index) in images")
            swiper-slide.item
                img(:src="src" :alt="'Screenshot' + index" @error="imageError")
        div.swiper-pagination(slot="pagination")
        //div.counter
        //    div.tick(v-for = "(_, index) in images" :class = {selected : index === imageIndex})
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    props:["images"],
    components : {
        swiper, swiperSlide
    },
    data() {
        return {
            imageIndex : 0,
            sOptions : {
                pagination: {
                    el: '.swiper-pagination',
                    type : "bullets",
                    bulletElement: "div",
                    clickable : true,
                    renderBullet: function (index, className) {
                        return `<div class="${className}"></div>`;
                    }
                }
            }
        }
    },
    methods: {
        imageError(e) {
            e.target.className += " broken";
        }
    }
}
</script>
<style lang="scss" scoped>

@import "./../constants/constants.scss";

.carousel {
    position: relative;
    width: 100%;
    height: calc(100% - 3em);
}

.item {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;

    &.broken {
        display: none;
    }
}

.counter {
    position: absolute;
    bottom: 1em;
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

<style lang="scss">

@import "./../constants/constants.scss";

.swiper-pagination-bullet {
    position: relative;
    width: 32px;
    height: 8px;
    margin: auto 8px 0 8px;
    transition: all 0.1s linear;
    z-index: 10;
    opacity: 1;
    background: none;

    &::before, &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
    }
    &::after {
        background: $var-title-text-color;
    }

    &::before {
        background: black;
        opacity: 0.5;
        transform-origin: bottom right;
        transform: skewX(45deg) scaleY(0.5);
    }

}

.swiper-pagination-bullet-active {
    height: 32px;
    margin: auto 8px -12px 24px;

}


</style>
