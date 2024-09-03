export const appStore = defineStore("app", {
  state: () => ({
    posts: [],
    postsPagination: {
      pageIndex: 1,
      pageSize: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    pageTitle: null,
    breadCrumbs: [],
    sidebar: false,
  }),
  getters: {
    getPostPageIndex: (state) => state.postsPagination.pageIndex,
    getPostPageSize: (state) => state.postsPagination.pageSize,
    getPostTotalPages: (state) => state.postsPagination.totalPages,
    getPostHasNextPage: (state) => state.postsPagination.hasNextPage,
    getPostHasPreviousPage: (state) => state.postsPagination.hasPreviousPage,
    getPosts: (state) => state.posts,
    getBreadcrumbs: (state) => state.breadCrumbs,
    getPageTitle: (state) => state.pageTitle,
    getSidebar: (state) => state.sidebar,
  },
  actions: {
    setPostPageIndex(index) {
      this.postsPagination.pageIndex = index;
    },
    setPostPageSize(size) {
      this.postsPagination.pageSize = size;
    },
    setPostTotalPages(size) {
      this.postsPagination.totalPages = size;
    },
    setPostHasNextPage(condition) {
      this.postsPagination.hasNextPage = condition;
    },
    setPostHasPreviousPage(condition) {
      this.postsPagination.hasPreviousPage = condition;
    },
    setPosts(posts) {
      this.posts = posts;
    },
    setPageTitle(pageTitle) {
      this.pageTitle = pageTitle;
    },
    setBreadcrumbs(breadCrumbs) {
      this.breadCrumbs = breadCrumbs;
    },
    setSidebar(sidebar) {
      this.sidebar = sidebar;
    },
  },
});
