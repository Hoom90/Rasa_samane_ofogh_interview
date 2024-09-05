<script setup>
import headerComp from "./components/header.vue"
import sidebarComp from "./components/sidebar.vue"
const store = appStore()
</script>

<template>
    <div class="dark:bg-gray-950 flex gap-3">
        <headerComp></headerComp>
        <sidebarComp></sidebarComp>
        <UContainer class="mt-16 pt-5 min-h-[calc(100vh-64px)] ms-auto transition-all"
            :class="store.getSidebar ? 'w-[calc(100vw-118px)]' : 'w-[calc(100vw-248px)]'">
            <UBreadcrumb :links="store.getBreadcrumbs" class="p-1" />
            <hr class="p-1" v-if="store.getBreadcrumbs.length != 0" />
            <NuxtPage />
        </UContainer>

        <UNotifications />

    </div>
</template>