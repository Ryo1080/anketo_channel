<template>
  <div>
    <chart :chartLabels="optionNames" :chartData="voteCounts"></chart>
    <v-container>
      <v-radio-group v-model="selectedOption">
        <v-list v-for="(option, index) in anketo.options" :key="index">
          <v-radio :label="option.option" :value="option.id"></v-radio>
        </v-list>
      </v-radio-group>
    </v-container>
    <v-container>
      <v-btn @click="executeVote">投票する</v-btn>
    </v-container>
    <hr />
    <template v-for="(item, index) in items">
      <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
      <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
      <v-list-item v-else :key="item.title">
        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
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
import CreateCommentDialog from "~/components/CreateCommentDialog.vue";
import axios from "axios";

export default {
  components: {
    Chart,
    CreateCommentDialog,
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/anketo/${params.id}`
    );
    return { anketo: data };
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
      items: [
        { header: "コメント一覧" },
        {
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: false },
        {
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: false },
        {
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: false },
        {
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: false },
        {
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
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
