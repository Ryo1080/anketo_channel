<template>
  <div>
    <v-container>
      <chart :chartLabels="optionNames" :chartData="voteCounts"></chart>
      <v-radio-group v-model="selectedOption">
        <v-list>
          <v-list-item v-for="(option, index) in $store.state.anketo.options" :key="index">
            <v-radio :label="option.option" :value="option.id"></v-radio>
          </v-list-item>
        </v-list>
      </v-radio-group>
      <v-btn @click="executeVote">投票する</v-btn>
    </v-container>
    <hr />
    <comment-list :comments="$store.state.comments"></comment-list>
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

export default {
  components: {
    Chart,
    CommentList,
    CreateCommentDialog,
  },
  async asyncData({ params, store }) {
    await store.dispatch("getAnketoAction", params);
    await store.dispatch("getCommentsAction", params);
  },
  computed: {
    optionNames: function () {
      return this.$store.state.anketo.options.map(function (option) {
        return option.option;
      });
    },
    voteCounts: function () {
      return this.$store.state.anketo.options.map(function (option) {
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
      await this.$store.dispatch("executeVote", this.selectedOption);
      location.reload();
    },
  },
};
</script>
