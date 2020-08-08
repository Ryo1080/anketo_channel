<template>
  <v-dialog v-model="createAnketoDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">アンケートを作成する</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field label="タイトル" single-line></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea filled name="input" label="説明文" value hint></v-textarea>
          </v-col>
          <v-col cols="12" v-for="option in anketoOptions" :key="option">
            <v-text-field :placeholder="option"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createAnketoDialog = false">Cancel</v-btn>
        <v-btn text @click="createAnketoDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createAnketoDialog: false,
      anketoOptions: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
    };
  },
  methods: {
    toggle: function () {
      this.createAnketoDialog = !this.createAnketoDialog;
    },
  },
};
</script>
