<script setup>
import image1 from "@/assets/image/image1.avif"
import image2 from "@/assets/image/image2.avif"
import image3 from "@/assets/image/image3.avif"
import image4 from "@/assets/image/image4.avif"
import image5 from "@/assets/image/image5.avif"
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
const state = reactive({
    modules: [EffectFade, Autoplay, Navigation],
    data: [
        { imageId: image1, title: image1 },
        { imageId: image2, title: image2 },
        { imageId: image3, title: image3 },
        { imageId: image4, title: image4 },
        { imageId: image5, title: image5 },
    ]
})
</script>

<template>
    <swiper class="mt-3 rounded" :slidesPerView="1" effect="fade" :loop="true" :centeredSlides="true" :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
    }" :navigation="true" :modules="state.modules">
        <swiper-slide v-for="item in state.data">
            <img :src="item.imageId" :alt="item.title" class="mx-auto" />
            <!-- <p class="slider-title" v-if="!item.link">{{ item.title }}</p>
            <p class="slider-title" v-else><nuxt-link :to="item.link">{{ item.title }}</nuxt-link></p> -->
        </swiper-slide>
    </swiper>
</template>