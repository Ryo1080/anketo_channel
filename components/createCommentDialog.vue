<template>
  <v-dialog v-model="createCommentDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">コメントする</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-textarea v-model="comment" filled name="input" label="コメント" value hint></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createCommentDialog = false">キャンセル</v-btn>
        <v-btn text @click="createComment">投稿する</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createCommentDialog: false,
      comment: "",
    };
  },
  methods: {
    toggle: function () {
      this.createCommentDialog = !this.createCommentDialog;
    },
    createComment: async function () {
      const payload = {
        anketoId: this.$route.params.id,
        comment: this.comment,
      };
      await this.$store.dispatch("createCommentsAction", payload);
      this.toggle();
    },
  },
};
</script>
