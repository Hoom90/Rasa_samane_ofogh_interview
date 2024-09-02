<script setup>
import closeIconComp from "@/assets/components/close.vue"
import leftIconComp from "@/assets/components/left.vue"
const memory = appStore()
const links = [
    { title: 'صفحه اصلی', to: '/' },
    { title: 'پست ها', to: '/posts' },
    { title: 'پست جدید', to: '/posts/add' },
    { title: 'آمار بازدید', to: '/visitState' },
]
</script>
<template>
    <div v-if="memory.getSidebar" class="absolute top-0 right-0 bg-white text-black w-screen h-screen z-10">
        <div class="flex justify-center items-center h-full">
            <div class="grid gap-1 text-center">
                <nuxtLink v-for="(item, index) in links" :key="index" :to="item.to"
                    class="border border-blue-500 bg-white rounded p-3 px-6">
                    {{ item.title }}
                </nuxtLink>
            </div>
        </div>

        <button type="button" class="absolute top-5 left-5 cursor-pointer" @click="memory.setSidebar(false)">
            <closeIconComp :width="40" color="#000" />
        </button>
    </div>

    <div class="absolute top-[20%] right-0">
        <button type="button" class="bg-white rounded-l-xl" @click="memory.setSidebar(true)">
            <leftIconComp width="40" color="#aaa" />
        </button>
    </div>
</template>