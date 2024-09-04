<script setup>
import image1 from "@/assets/image/image1.avif"
import image2 from "@/assets/image/image2.avif"
import image3 from "@/assets/image/image3.avif"
import image4 from "@/assets/image/image4.avif"
import image5 from "@/assets/image/image5.avif"
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
const breadCrumb = appStore()
const state = reactive({
    modules: [Autoplay, Navigation],
    data: [
        { imageId: image1, title: image1 },
        { imageId: image2, title: image2 },
        { imageId: image3, title: image3 },
        { imageId: image4, title: image4 },
        { imageId: image5, title: image5 },
    ]
})

useHead({
    title: 'صفحه اصلی',
    meta: [{ name: 'description', content: 'این یک برنامه تستی میباشد' }],
    meta: [{ name: 'keywords', content: 'کلیدواژه 1,کلیدواژه 2' }],
})

onMounted(() => {
    breadCrumb.setBreadcrumbs([])
    breadCrumb.setPageTitle(null)
})

</script>

<template>
    <swiper class="rounded" :slidesPerView="1" :loop="true" :centeredSlides="true" :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
    }" navigation :modules="state.modules">
        <swiper-slide v-for="item in state.data">
            <img :src="item.imageId" :alt="item.title" class="mx-auto" />
        </swiper-slide>
    </swiper>
</template>