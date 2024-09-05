<script setup>
const router = useRouter()
const store = appStore()
const links = [
    { title: 'صفحه اصلی', to: '/', icon: 'i-heroicons-home' },
    { title: 'پست ها', to: '/posts', icon: 'i-heroicons-inbox' },
    { title: 'پست جدید', to: '/posts/add', icon: 'i-heroicons-inbox-arrow-down' },
    { title: 'آمار بازدید', to: '/visitState', icon: 'i-heroicons-chart-pie' },
]

const handleRouting = (link) => {
    router.push(link)
    store.setSidebar(false)
}

</script>
<template>
    <div class="sticky top-0 right-0 h-screen z-40 transition-all border-l"
        :class="store.getSidebar ? 'w-[70px]' : 'w-[200px]'">
        <div class="mt-16 bg-white dark:bg-gray-950 dark:text-white">
            <div class="grid gap-1 p-3">
                <UButton size="xl" block v-for="(item, index) in links" :key="index" :icon="item.icon"
                    :label="store.getSidebar ? '' : item.title" @click="handleRouting(item.to)">
                </UButton>
            </div>
        </div>
    </div>
</template>