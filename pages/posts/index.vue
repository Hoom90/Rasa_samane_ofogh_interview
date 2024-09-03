<script setup>
import postImg from "@/assets/image/post.avif"
const store = appStore()
const state = reactive({
    posts: [],
    pageSize: 10,
})

onBeforeMount(() => {
    store.setBreadcrumbs([])
    store.setPageTitle('پست ها')
    getData()
})

const getData = async () => {
    if (store.getPosts.length == 0) {
        await axiosApi().get(apiPath.posts)
            .then(res => {
                state.posts = res.data
                store.setPosts(state.posts)
                store.setPostPageIndex(1)
                store.setPostPageSize(state.pageSize)
                store.setPostTotalPages(state.posts.length / state.pageSize)
                store.setPostHasNextPage(store.getPostTotalPages > 1 ? true : false)
                store.setPostHasPreviousPage(store.getPostPageIndex == 1 ? false : true)
            })
            .catch(e => console.error(e))
    }
    else state.posts = store.getPosts
    calculatePagination()
}

const calculatePagination = () => {
    let initialAmount = store.getPostPageSize
    if (store.getPostPageIndex == 1) initialAmount = 0
    let startIndex = initialAmount * store.getPostPageIndex
    let endIndex = startIndex + store.getPostPageSize
    state.posts = state.posts.slice(startIndex, endIndex)
}

const changePagination = (index) => {
    if (index == store.getPostPageIndex) return
    else {
        store.setPostPageIndex(index)
        state.posts = store.getPosts
        calculatePagination()
    }
}

</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        <div v-for="(post, index) in state.posts" :key="index" class="bg-gray-100 rounded overflow-hidden shadow">
            <img :src="postImg" alt="" class="w-full aspect-square object-cover">
            <p class="p-3">{{ post.title }}</p>
        </div>
    </div>

    <div class="flex justify-center items-center gap-1 my-3 mb-20">
        <button v-for="(item, index) in store.getPostTotalPages" @click="changePagination(index + 1)"
            class="p-1 border shadow w-full aspect-square"
            :class="index + 1 == store.getPostPageIndex ? 'bg-blue-500 text-white' : ''">{{ index + 1
            }}</button>
    </div>
</template>