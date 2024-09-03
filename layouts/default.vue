<script setup>
import headerComp from "./components/header.vue"
import sidebarComp from "./components/sidebar.vue"
</script>

<template>
    <UContainer>
        <headerComp></headerComp>
        <sidebarComp></sidebarComp>
        <div class="mt-20">
            <NuxtPage />
        </div>
    </UContainer>
</template>