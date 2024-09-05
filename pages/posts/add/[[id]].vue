<script setup>
const store = appStore()
const state = reactive({
    posts: null,
    post: {
        userId: 1,
        id: null,
        title: null,
        body: null,
    },
})

useHead({
    title: 'افزودن پست جدید',
    meta: [{ name: 'description', content: 'این صفحه برای تست API و عملکرد فرم میباشد.' }],
    meta: [{ name: 'keywords', content: 'کلیدواژه 1,کلیدواژه 2' }],
})

onBeforeMount(() => {
    // نمایش 
    // breadcrumb 
    // در این صفحه
    store.setBreadcrumbs([{ label: 'صفحه اصلی', to: '/' }, { label: 'پست ها', to: '/posts' }, { label: 'افزودن پست جدید' }])
    store.setPageTitle('افزودن پست جدید') // نام صفحه
})

const addPost = async () => {
    await axiosApi().post(apiPath.addPost, state.post)
        .then(res => {
            state.posts = store.getPosts
            state.post.id = store.getAddNewPostIndex
            state.posts.push({ ...state.post })
            store.setPosts(state.posts)
            store.setAddNewPostIndex(store.getAddNewPostIndex + 1)
            state.post.title = null
            state.post.body = null
        })
        .catch(e => console.error(e))
}

const validate = () => {
    const errors = []
    if (!state.post.title) errors.push({ path: 'title', message: 'وارد کردن عنوان الزامی است' })
    if (!state.post.body) errors.push({ path: 'body', message: 'وارد کردن متن الزامی است' })
    return errors
}

</script>

<template>
    <UForm :validate="validate" @submit.prevent="addPost">
        <UFormGroup label="عنوان*" name="title" class="mb-3">
            <UInput v-model="state.post.title" variant="outline" placeholder="عنوان را اینجا وارد کنید" />
        </UFormGroup>

        <UFormGroup label="متن*" name="body" class="mb-3">
            <UTextarea v-model="state.post.body" variant="outline" :rows="8" placeholder="متن را اینجا وارد کنید" />
        </UFormGroup>

        <UButton icon="i-heroicons-check" label="تایید" color="blue" variant="solid" type="submit" />
    </UForm>
</template>