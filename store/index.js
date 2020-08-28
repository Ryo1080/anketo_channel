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
      getAnketosAction(context, payload) {
        context.commit("updateAnketos", anketoResponse.data);
      },
      createAnketosAction(context, payload) {
        context.commit("updateMessage", payload);
      },
      async getCommentsAction(context, payload) {
        const commentsResponse = await axios.get(
          `${baseUrl}/anketo/${payload.id}/comment`
        );
        context.commit("updateComments", commentsResponse.data.comments);
      },
      async createCommentsAction(context, payload) {
        await axios.post(
          `http://localhost:3000/api/v1/anketo/${payload.anketoId}/comment`,
          {
            comment: payload.comment
          }
        );
        const commentsResponse = await axios.get(
          `${baseUrl}/anketo/${payload.anketoId}/comment`
        );
        context.commit("updateComments", commentsResponse.data.comments);
      },
      async executeVote(context, selectedOption) {
        await axios.post(`${baseUrl}/vote`, {
          option_id: selectedOption,
          ip: "test_id"
        });
      }
    }
  });
};

export default createStore;
