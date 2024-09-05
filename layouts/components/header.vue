<script setup>
import logoComp from "@/assets/components/logo.vue"
const store = appStore()
</script>
<template>
    <div class="fixed top-0 left-0 w-full z-50">
        <div class="p-3 bg-white dark:bg-gray-900 dark:text-white shadow" @scroll="">
            <div class="grid items-center text-center grid-cols-3">
                <div class="text-start">
                    <UButton size="xl" icon="i-heroicons-bars-3" @click="store.setSidebar(!store.getSidebar)" />
                </div>
                <div v-if="store.getPageTitle">
                    {{ store.getPageTitle }}
                </div>
                <div class="flex items-center" :class="!store.getPageTitle ? 'justify-center' : 'justify-end'">
                    <UButton variant="text" size="" to="/">
                        <logoComp size="40" />
                        <span v-if="!store.getPageTitle">رسا سامانه افق</span>
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>