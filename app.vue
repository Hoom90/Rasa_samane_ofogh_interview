<script setup>
useHead({
  titleTemplate: (page) => {
    return page
      ? `رسا سامانه افق - ${page}`
      : 'رسا سامانه افق'
  },
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  },
})
</script>
<template>
  <nuxtLayout>
    <nuxtPage />
  </nuxtLayout>
</template>