import Vuex from "vuex";
import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1";

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        anketo: {},
        anketos: [],
        comments: []
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
      }
    },
    actions: {
      async getAnketoAction(context, payload) {
        const anketoResponse = await axios.get(
          `${baseUrl}/anketo/${payload.id}`
        );
        context.commit("updateAnketo", anketoResponse.data);
      },
      async getAnketosAction(context) {
        const { data } = await axios.get(`${baseUrl}/anketo`);
        context.commit("updateAnketos", data.anketos);
      },
      async createAnketosAction(context, payload) {
        await axios.post(`${baseUrl}/anketo`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        // await axios.post(`${baseUrl}/anketo`, {
        //   title: payload.title,
        //   description: payload.description,
        //   anketoOptions: payload.anketoOptions,
        //   categoryId: payload.categoryId
        // });
        const { data } = await axios.get(`${baseUrl}/anketo`);
        context.commit("updateAnketos", data.anketos);
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
      async executeVote(context, selectedOption) {
        await axios.post(`${baseUrl}/vote`, {
          optionId: selectedOption,
          ip: "test_id"
        });
      }
    }
  });
};

export default createStore;
