<template>
  <v-dialog v-model="createCommentDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">コメントする</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-textarea filled name="input" label="コメント" value hint></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createCommentDialog = false">Cancel</v-btn>
        <v-btn text @click="createCommentDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createCommentDialog: false,
    };
  },
  methods: {
    toggle: function () {
      this.createCommentDialog = !this.createCommentDialog;
    },
  },
};
</script>
