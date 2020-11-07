<template>
  <div>
    <v-container>
      <v-container>
        <h1 class="text-center">{{ anketo.title }}</h1>
        <p class="text-center">{{ anketo.description }}</p>
        <div v-if="anketo.image">
          <v-img :src="anketo.image" aspect-ratio="2.0" contain></v-img>
        </div>
      </v-container>

      <v-container>
        <chart :chartLabels="optionNames" :chartData="voteCounts"></chart>
        <v-radio-group v-model="selectedOptionId">
          <v-list>
            <v-list-item v-for="(option, index) in anketo.options" :key="index">
              <v-radio :label="option.option" :value="option.id"></v-radio>
            </v-list-item>
          </v-list>
        </v-radio-group>
        <v-btn @click="executeVote">投票する</v-btn>
      </v-container>
    </v-container>
    <hr />
    <comment-list :comments="$store.state.comment.comments"></comment-list>
    <v-btn
      rounded
      color="primary"
      fixed
      right
      bottom
      large
      @click="toggleCreateCommentDialog"
      >コメントする</v-btn
    >
    <create-comment-dialog ref="createCommentDialog"></create-comment-dialog>
    <alert-dialog
      ref="alertDialog"
      :alertMessage="'すでに投票しています'"
    ></alert-dialog>
  </div>
</template>

<script>
import Chart from "~/components/Chart";
import CommentList from "~/components/CommentList.vue";
import CreateCommentDialog from "~/components/CreateCommentDialog.vue";
import AlertDialog from "~/components/AlertDialog.vue";

export default {
  components: {
    Chart,
    CommentList,
    CreateCommentDialog,
    AlertDialog,
  },
  async asyncData({ params, store }) {
    await store.dispatch("anketo/getAnketoAction", params);
    await store.dispatch("comment/getCommentsAction", params);
  },
  computed: {
    optionNames: function () {
      return this.$store.state.anketo.anketo.options.map(function (option) {
        return option.option;
      });
    },
    voteCounts: function () {
      return this.$store.state.anketo.anketo.options.map(function (option) {
        return option.votes;
      });
    },
  },
  data() {
    return {
      selectedOptionId: null,
      anketo: this.$store.state.anketo.anketo,
    };
  },
  methods: {
    toggleCreateCommentDialog: function () {
      this.$refs.createCommentDialog.toggle();
    },
    toggleAlertDialog: function () {
      this.$refs.alertDialog.toggle();
    },
    executeVote: async function () {
      const payload = {
        anketoId: this.anketo.id,
        selectedOptionId: this.selectedOptionId,
      };

      let res = await this.$axios.$post(`/vote`, payload);

      if (res.alreadyVote) {
        this.toggleAlertDialog();
      } else {
        location.reload();
      }
    },
  },
};
</script>
