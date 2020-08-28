import Vuex from "vuex";
import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1";

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        anketos: [],
        comments: []
      };
    },
    mutations: {
      updateAnketos: function(state, payload) {
        state.anketos = payload;
      },
      updateComments: function(state, comments) {
        state.comments = comments;
      }
    },
    actions: {
      getAnketosAction(context, payload) {
        context.commit("updateMessage", payload);
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
      }
    }
  });
};

export default createStore;
