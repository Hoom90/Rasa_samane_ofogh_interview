<script setup>
const props = defineProps(['width', 'color'])
</script>

<template>
    <svg :width="width" :height="width" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21.32L21 3.32001" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3 3.32001L21 21.32" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>