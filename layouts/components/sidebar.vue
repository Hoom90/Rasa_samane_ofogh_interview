<script setup>
import closeIconComp from "@/assets/components/close.vue"
import leftIconComp from "@/assets/components/left.vue"
const router = useRouter()
const memory = appStore()
const links = [
    { title: 'صفحه اصلی', to: '/' },
    { title: 'پست ها', to: '/posts' },
    { title: 'پست جدید', to: '/posts/add' },
    { title: 'آمار بازدید', to: '/visitState' },
]

const handleRouting = (link) => {
    router.push(link)
    memory.setSidebar(false)
}

</script>
<template>
    <div v-if="memory.getSidebar"
        class="fixed top-0 right-0 bg-white dark:bg-gray-950 dark:text-white w-screen h-screen z-50">
        <div class="flex justify-center items-center h-full">
            <div class="flex flex-wrap justify-center gap-1">
                <button type="button" v-for="(item, index) in links" :key="index" @click="handleRouting(item.to)"
                    class="border bg-white border-red-700 dark:bg-red-700 rounded p-3 px-6 w-[200px]">
                    {{ item.title }}
                </button>
            </div>
        </div>

        <button type="button" class="absolute top-5 left-5 cursor-pointer" @click="memory.setSidebar(false)">
            <closeIconComp :width="40" color="currentColor" />
        </button>
    </div>

    <div class="fixed top-[20%] right-0 z-40">
        <button type="button" class="bg-red-700 text-white rounded-l-xl shadow-xl" @click="memory.setSidebar(true)">
            <leftIconComp width="40" color="currentColor" />
        </button>
    </div>
</template>