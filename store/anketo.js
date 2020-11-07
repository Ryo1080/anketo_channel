export const state = () => ({
  anketo: {},
  anketos: []
});

export const mutations = {
  updateAnketo: function(state, anketo) {
    state.anketo = anketo;
  },
  updateAnketos: function(state, anketos) {
    state.anketos = anketos;
  }
};

export const actions = {
  async getAnketoAction(context, payload) {
    const anketoResponse = await this.$axios.$get(`/anketo/${payload.id}`);
    context.commit("updateAnketo", anketoResponse);
  },
  async createAnketosAction(context, payload) {
    await this.$axios.$post(`/anketo`, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async searchAnketosAction(context, payload) {
    const searchResult = await this.$axios.$get(`/anketo/search`, {
      params: {
        keyword: payload.keyword,
        sortId: payload.sortId,
        categoryId: payload.categoryId
      }
    });
    context.commit("updateAnketos", searchResult.anketos);
  }
};
