<script setup>
import logoComp from "@/assets/components/logo.vue"
import rightIconComp from "@/assets/components/right.vue"
const breadcrumb = appStore()
</script>
<template>
    <div class="p-3 bg-white text-black shadow rounded-b">
        <div class="grid items-center text-center"
            :class="breadcrumb.getBreadcrumbs.length == 0 ? 'grid-cols-1' : 'grid-cols-3'">
            <div v-if="breadcrumb.getBreadcrumbs.length != 0">
                <rightIconComp width="40" color="currentColor" />
            </div>
            <div v-if="breadcrumb.getPageTitle">
                {{ breadcrumb.getPageTitle }}
            </div>
            <div class="flex items-center"
                :class="breadcrumb.getBreadcrumbs.length == 0 ? 'justify-center' : 'justify-end'">
                <span v-if="breadcrumb.getBreadcrumbs.length == 0">رسا سامانه افق</span>
                <logoComp size="40" />
            </div>
        </div>
    </div>
</template>