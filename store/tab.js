export const state = () => ({
  tabIndex: ""
});

export const mutations = {
  updateTab: function(state, tabIndex) {
    state.tabIndex = tabIndex;
  }
};

export const actions = {
  async changeTab(context, payload) {
    context.commit("updateTab", payload.tabIndex);
  }
};
