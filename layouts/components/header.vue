<script setup>
import logoComp from "@/assets/components/logo.vue"
import rightIconComp from "@/assets/components/right.vue"
const breadcrumb = appStore()
</script>
<template>
    <div class="fixed top-0 left-0 w-full">
        <div class="p-3 bg-red-400 text-white shadow rounded-b">
            <div class="grid items-center text-center" :class="breadcrumb.getPageTitle ? 'grid-cols-3' : 'grid-cols-1'">
                <div v-if="breadcrumb.getPageTitle">
                    <rightIconComp v-if="breadcrumb.getBreadcrumbs.length != 0" width="40" color="currentColor" />
                </div>
                <div v-if="breadcrumb.getPageTitle">
                    {{ breadcrumb.getPageTitle }}
                </div>
                <div class="flex items-center" :class="!breadcrumb.getPageTitle ? 'justify-center' : 'justify-end'">
                    <span v-if="!breadcrumb.getPageTitle">رسا سامانه افق</span>
                    <logoComp size="40" />
                </div>
            </div>
        </div>
    </div>
</template>