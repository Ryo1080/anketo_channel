<template>
  <div>
    <v-container>
      <chart :chartLabels="optionNames" :chartData="voteCounts"></chart>
      <v-radio-group v-model="selectedOption">
        <v-list>
          <v-list-item v-for="(option, index) in anketo.options" :key="index">
            <v-radio :label="option.option" :value="option.id"></v-radio>
          </v-list-item>
        </v-list>
      </v-radio-group>
      <v-btn @click="executeVote">投票する</v-btn>
    </v-container>
    <hr />
    <comment-list :comments="comments"></comment-list>
    <v-btn
      rounded
      color="primary"
      fixed
      right
      bottom
      large
      @click="toggleCreateCommentDialog"
    >コメントする</v-btn>
    <create-comment-dialog ref="createCommentDialog"></create-comment-dialog>
  </div>
</template>

<script>
import Chart from "~/components/Chart";
import CommentList from "~/components/CommentList.vue";
import CreateCommentDialog from "~/components/CreateCommentDialog.vue";
import axios from "axios";

export default {
  components: {
    Chart,
    CommentList,
    CreateCommentDialog,
  },
  async asyncData({ params }) {
    const anketoResponse = await axios.get(
      `http://localhost:3000/api/v1/anketo/${params.id}`
    );
    const commentsResponse = await axios.get(
      `http://localhost:3000/api/v1/anketo/${params.id}/comment`
    );
    return {
      anketo: anketoResponse.data,
      comments: commentsResponse.data.comments,
    };
  },
  computed: {
    optionNames: function () {
      return this.anketo.options.map(function (option) {
        return option.option;
      });
    },
    voteCounts: function () {
      return this.anketo.options.map(function (option) {
        return option.votes;
      });
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  methods: {
    toggleCreateCommentDialog: function () {
      this.$refs.createCommentDialog.toggle();
    },
    executeVote: async function () {
      await axios.post("http://localhost:3000/api/v1/vote", {
        option_id: this.selectedOption,
        ip: "test_id",
      });
      location.reload();
    },
  },
};
</script>
