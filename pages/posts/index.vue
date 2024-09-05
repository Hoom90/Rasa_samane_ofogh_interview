<script setup>
const store = appStore()
const state = reactive({
    posts: [],
    comments: [],
    pageIndex: 1,
    pageSize: 10,
    column: [{
        key: 'id',
        label: 'ردیف',
        sortable: true,
    }, {
        key: 'title',
        label: 'عنوان',
        sortable: true
    }, {
        key: 'body',
        label: 'متن',
        sortable: true
    }, {
        key: 'actions',
    }],
    commentColumn: [{
        key: 'id',
        label: 'ردیف',
    }, {
        key: 'name',
        label: 'نام ',
    }, {
        key: 'email',
        label: 'ایمیل',
    }],
    dropdownActions: [[{
        key: 'delete',
        label: 'حذف کردن',
        icon: 'i-heroicons-trash'
    }]],
    selectedRows: [],
    selectedColumns: [],
    selected: [],
    search: null,

    isModal: false,
    isComment: false,
    isDelete: false,
    isMultiDelete: false,
    isEdit: false,
    deleteModal: { id: null },
    commentModal: null,
    editModal: null,
})

useHead({
    title: 'پست ها',
    meta: [{ name: 'description', content: 'این صفحه برای تست API میباشد.' }],
    meta: [{ name: 'keywords', content: 'کلیدواژه 1,کلیدواژه 2' }],
})

onBeforeMount(() => {
    // نمایش 
    // breadcrumb 
    // در این صفحه
    store.setBreadcrumbs([{ label: 'صفحه اصلی', to: '/' }, { label: 'پست ها', to: '/posts' }])
    store.setPageTitle('پست ها') // نام صفحه
    // عدم نمایش
    // Body 
    // از دیتایی که از سرور میآید در جدول
    state.selectedColumns = [...state.column.filter(x => x.key != 'body')]
    getData()
})

const getData = async () => {
    if (store.getPosts.length == 0) {
        await axiosApi().get(apiPath.getAllPosts)
            .then(res => {
                state.posts = res.data
                store.setPosts(state.posts)
                store.setPostPageIndex(1)
                store.setPostPageSize(state.pageSize)
                store.setPostTotalPages(state.posts.length / state.pageSize)
            })
            .catch(e => console.error(e))
    }
    else state.posts = store.getPosts
}

const getComments = async () => {
    await axiosApi().get(apiPath.getAllCommentsByPostId(state.commentModal.id))
        .then(res => {
            state.comments = res.data
        }).catch(e => console.error(e))
}

const deletePost = async () => {
    await axiosApi().delete(apiPath.deletePost(state.deleteModal.id)).
        then(res => {
            // getData() بروزرسانی به وسیله سرور
            state.posts = state.posts.filter(x => x.id != state.deleteModal.id) // بروزرسانی سمت کاربر
            store.setPosts(state.posts)
            state.isModal = false
        })
        .catch(e => console.error(e))
}

const deleteMulti = async () => {
    for (let item of state.selectedRows) {
        state.deleteModal.id = item.id
        await axiosApi().delete(apiPath.deletePost(state.deleteModal.id)).
            then(res => {
                // getData() بروزرسانی به وسیله سرور
                state.posts = state.posts.filter(x => x.id != state.deleteModal.id) // بروزرسانی سمت کاربر
                store.setPosts(state.posts)
            })
            .catch(e => console.error(e))
    }
    state.isModal = false
}

const editPost = async () => {
    await axiosApi().put(apiPath.putPost(state.editModal.id), state.editModal)
        .then(res => {
            // getData() بروزرسانی به وسیله سرور
            // بروزرسانی سمت کاربر
            let temp = state.posts.find(x => x.id == state.editModal.id)
            temp.title = state.editModal.title
            temp.body = state.editModal.body
            store.setPosts(state.posts)
            state.isModal = false
        })
        .catch(e => console.error(e))
}

const validate = () => {
    const errors = []
    if (!state.editModal.title) errors.push({ path: 'title', message: 'وارد کردن عنوان الزامی است' })
    if (!state.editModal.body) errors.push({ path: 'body', message: 'وارد کردن متن الزامی است' })
    return errors
}

const select = (row) => {
    const index = state.selectedRows.findIndex((item) => item.id === row.id)
    if (index === -1) {
        state.selectedRows.push(row)
    } else {
        state.selectedRows.splice(index, 1)
    }
}

const filteredRows = computed(() => {
    if (!state.search) {
        return state.posts.slice((state.pageIndex - 1) * state.pageSize, (state.pageIndex) * state.pageSize)
    }

    return state.posts.filter(x => {
        return Object.values(x).some((value) => {
            return String(value).toLowerCase().includes(state.search.toLowerCase())
        })
    })
})

const handleComments = (row) => {
    state.commentModal = {
        id: row.id,
        title: row.title
    } // اطلاعات قابل نمایش برای مودال
    getComments()
    state.isModal = true // جهت نمایش مودال
    state.isDelete = false
    state.isEdit = false
    state.isMultiDelete = false
    state.isComment = true // جهت نمایش نظرات ها
}

const handleDelete = (row) => {
    state.deleteModal = {
        id: row.id,
        title: row.title
    } // اطلاعات قابل نمایش برای مودال
    state.isModal = true // جهت نمایش مودال
    state.isDelete = true // جهت نمایش حذف
    state.isMultiDelete = false
    state.isEdit = false
    state.isComment = false
}

const handleMultiDelete = () => {
    state.isModal = true // جهت نمایش مودال
    state.isMultiDelete = true // جهت نمایش حذف چندتایی
    state.isDelete = false
    state.isEdit = false
    state.isComment = false
}

const handleEdit = (row) => {
    state.editModal = { ...row }
    state.isModal = true // جهت نمایش مودال
    state.isMultiDelete = false
    state.isDelete = false
    state.isEdit = true // جهت نمایش ویرایش
    state.isComment = false
}
</script>

<template>
    <div class="flex justify-between gap-1">
        <div class="flex gap-1">
            <UButton icon="i-heroicons-plus" color="gray" size="xs" @click="$router.push('/posts/add')">
                افزودن پست جدید
            </UButton>
            <UInput v-model="state.search" icon="i-heroicons-magnifying-glass-20-solid" size="xs" placeholder="جستجو..." />
        </div>

        <div class="flex gap-1">
            <UButton v-if="state.selectedRows.length > 1" icon="i-heroicons-trash" :trailing="false" color="gray" size="xs"
                @click="handleMultiDelete">
                حذف کردن
            </UButton>
            <!-- <UDropdown :items="state.dropdownActions" :ui="{ width: 'w-36' }">
            </UDropdown> -->
            <USelectMenu v-model="state.selectedColumns" :options="state.column" multiple>
                <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                    نام ستون
                </UButton>
            </USelectMenu>
            <UButton icon="i-heroicons-funnel" color="gray" size="xs"
                :disabled="state.search === '' && state.selectedStatus.length === 0" @click="resetFilters">
                حذف فیلتر
            </UButton>
        </div>
    </div>

    <UTable v-model="state.selectedRows" @select="select" :columns="state.selectedColumns" :rows="filteredRows">
        <template #actions-data="{ row }">
            <div class="flex gap-1">
                <UButton icon="i-heroicons-chat-bubble-oval-left" size="2xs" color="blue" variant="outline" square
                    @click="handleComments(row)" />
                <UButton icon="i-heroicons-pencil" size="2xs" color="orange" variant="outline" square
                    @click="handleEdit(row)" />
                <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="outline" square
                    @click="handleDelete(row)" />
            </div>
        </template>
    </UTable>

    <div v-if="!state.search" class="flex justify-center px-3 py-3 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="state.pageIndex" :page-count="state.pageSize" :total="state.posts.length" />
    </div>

    <UModal v-model="state.isModal" class="dark:text-gray-100 " :ui="state.isComment ? { width: '' } : ''">

        <template v-if="state.isDelete">
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <p class="text-red-500">{{ `حذف پست` }}</p>
                </template>

                <p>{{ `آیا از حذف پست ${state.deleteModal.title} مطمئن هستید؟` }}</p>
                <p>این عملیات قابل بازگشت نیست!</p>

                <template #footer>
                    <div class="grid grid-cols-2 gap-1">
                        <UButton icon="i-heroicons-x-mark" label="انصراف" color="red" variant="solid"
                            @click="state.isModal = false" block />
                        <UButton icon="i-heroicons-check" label="تایید" color="blue" variant="solid" @click="deletePost"
                            block />
                    </div>
                </template>
            </UCard>
        </template>

        <template v-if="state.isComment">
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="w-full">
                <template #header>
                    <p>نظرات پست</p>
                    <p>{{ state.commentModal.title }}</p>
                </template>

                <UTable :columns="state.commentColumn" :rows="state.comments">
                    <template #expand="{ row }">
                        <div class="p-4 max-w-[500px]">
                            <p class="text-wrap">{{ row.body }}</p>
                        </div>
                    </template>
                </UTable>

                <template #footer>
                    <Placeholder class="h-8" />
                </template>
            </UCard>
        </template>

        <template v-if="state.isMultiDelete">
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <p class="text-red-500">حذف چندتایی پست</p>
                </template>

                <p>آیا از حذف پست های انتخاب شده مطمئن هستید؟</p>
                <p>این عملیات قابل بازگشت نیست!</p>

                <template #footer>
                    <div class="grid grid-cols-2 gap-1">
                        <UButton icon="i-heroicons-x-mark" label="انصراف" color="red" variant="solid"
                            @click="state.isModal = false" block />
                        <UButton icon="i-heroicons-check" label="تایید" color="blue" variant="solid" @click="deleteMulti"
                            block />
                    </div>
                </template>
            </UCard>
        </template>

        <template v-if="state.isEdit">
            <UForm :validate="validate" @submit.prevent="editPost">
                <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <p class="text-orange-500">ویرایش پست</p>
                    </template>

                    <UFormGroup label="عنوان" name="title">
                        <UInput v-model="state.editModal.title" variant="outline" placeholder="عنوان" />
                    </UFormGroup>

                    <UFormGroup label="متن" name="body">
                        <UTextarea v-model="state.editModal.body" variant="outline" :rows="8" placeholder="متن" />
                    </UFormGroup>

                    <template #footer>
                        <div class="grid grid-cols-2 gap-1">
                            <UButton icon="i-heroicons-x-mark" label="انصراف" color="red" variant="solid"
                                @click="state.isModal = false" block />
                            <UButton icon="i-heroicons-check" label="تایید" color="blue" variant="solid" type="submit"
                                block />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </template>
    </UModal>
</template>