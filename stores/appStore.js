export const appStore = defineStore("app", {
  state: () => ({
    pageTitle: null,
    breadCrumbs: [],
    sidebar: false,
  }),
  getters: {
    getBreadcrumbs: (state) => state.breadCrumbs,
    getPageTitle: (state) => state.pageTitle,
    getSidebar: (state) => state.sidebar,
  },
  actions: {
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
