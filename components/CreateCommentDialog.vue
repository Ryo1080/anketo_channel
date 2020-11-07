<template>
  <v-dialog v-model="createCommentDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">コメントする</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-row class="mx-2">
          <v-col cols="12">
            <v-textarea
              v-model="comment"
              filled
              name="input"
              label="コメント"
              :rules="commentRule"
              value
              hint
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createCommentDialog = false">キャンセル</v-btn>
        <v-btn text @click="validate">投稿する</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createCommentDialog: false,
      valid: false,
      comment: "",
      commentRule: [
        (v) => !!v || "コメントは必須です",
        (v) =>
          (v && v.length <= 250) || "コメントは250文字以内で入力して下さい",
      ],
    };
  },
  methods: {
    toggle: function () {
      this.createCommentDialog = !this.createCommentDialog;
    },
    validate: function () {
      if (this.$refs.form.validate()) {
        this.createComment();
      }
    },
    createComment: async function () {
      const payload = {
        anketoId: this.$route.params.id,
        comment: this.comment,
      };
      await this.$store.dispatch("comment/createCommentsAction", payload);
      this.toggle();
    },
  },
};
</script>
