export const state = () => ({
  comments: []
});

export const mutations = {
  updateComments: function(state, comments) {
    state.comments = comments;
  }
};

export const actions = {
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
  }
};
