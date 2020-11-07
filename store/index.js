import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        anketo: {},
        anketos: [],
        comments: [],
        tabIndex: 0
      };
    },
    mutations: {
      updateAnketo: function(state, anketo) {
        state.anketo = anketo;
      },
      updateAnketos: function(state, anketos) {
        state.anketos = anketos;
      },
      updateComments: function(state, comments) {
        state.comments = comments;
      },
      updateTab: function(state, tabIndex) {
        state.tabIndex = tabIndex;
      }
    },
    actions: {
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
      },
      async getCommentsAction(context, payload) {
        const commentsResponse = await this.$axios.$get(
          `/anketo/${payload.id}/comment`
        );
        context.commit("updateComments", commentsResponse.comments);
      },
      async createCommentsAction(context, payload) {
        await this.$axios.$post(`/anketo/${payload.anketoId}/comment`, {
          comment: payload.comment
        });
        const commentsResponse = await this.$axios.$get(
          `/anketo/${payload.anketoId}/comment`
        );
        context.commit("updateComments", commentsResponse.comments);
      },
      async executeVote(context, payload) {
        return await this.$axios.$post(`/vote`, payload);
      },
      async changeTab(context, payload) {
        context.commit("updateTab", payload.tabIndex);
      }
    }
  });
};

export default createStore;
