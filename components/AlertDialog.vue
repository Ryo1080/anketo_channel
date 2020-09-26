<template>
  <v-row justify="center">
    <v-dialog v-model="alertDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{alertMessage}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="alertDialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["alertMessage"],
  data() {
    return {
      alertDialog: false,
    };
  },
  methods: {
    toggle: function () {
      this.alertDialog = !this.alertDialog;
    },
  },
};
</script>
