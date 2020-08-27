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
      updateComments: function(state, payload) {
        state.comments = payload;
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
      createCommentsAction(context, payload) {
        context.commit("updateComments", payload);
      }
    }
  });
};

export default createStore;
