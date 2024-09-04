<script setup>
import headerComp from "./components/header.vue"
import sidebarComp from "./components/sidebar.vue"
</script>

<template>
    <UContainer class="dark:bg-gray-950">
        <headerComp></headerComp>
        <sidebarComp></sidebarComp>
        <div class="mt-16 pt-5 min-h-[calc(100vh-64px)]">
            <NuxtPage />
        </div>
    </UContainer>
</template>