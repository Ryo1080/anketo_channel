import Vuex from "vuex";
import axios from "axios";
const config = require("../nuxt.config.js");
let baseUrl = "";

if (config.default.dev) {
  baseUrl = "http://localhost:3000/api/v1";
} else {
  baseUrl = "https://anketo-channel-api.com/api/v1";
}

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
        const anketoResponse = await axios.get(
          `${baseUrl}/anketo/${payload.id}`
        );
        context.commit("updateAnketo", anketoResponse.data);
      },
      async createAnketosAction(context, payload) {
        await axios.post(`${baseUrl}/anketo`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      },
      async searchAnketosAction(context, payload) {
        const { data } = await axios.get(`${baseUrl}/anketo/search`, {
          params: {
            keyword: payload.keyword,
            sortId: payload.sortId,
            categoryId: payload.categoryId
          }
        });
        context.commit("updateAnketos", data.anketos);
      },
      async getCommentsAction(context, payload) {
        const commentsResponse = await axios.get(
          `${baseUrl}/anketo/${payload.id}/comment`
        );
        context.commit("updateComments", commentsResponse.data.comments);
      },
      async createCommentsAction(context, payload) {
        await axios.post(`${baseUrl}/anketo/${payload.anketoId}/comment`, {
          comment: payload.comment
        });
        const commentsResponse = await axios.get(
          `${baseUrl}/anketo/${payload.anketoId}/comment`
        );
        context.commit("updateComments", commentsResponse.data.comments);
      },
      async executeVote(context, payload) {
        return await axios.post(`${baseUrl}/vote`, payload);
      },
      async changeTab(context, payload) {
        context.commit("updateTab", payload.tabIndex);
      }
    }
  });
};

export default createStore;
