<template>
  <v-app dark>
    <v-app-bar fixed app class="elevation-0" color="white">
      <v-toolbar-title v-text="title" @click="navigateIndexPage" />
      <v-spacer></v-spacer>

      <v-btn v-if="$route.name === 'index'" icon @click="toggleSearchDialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <search-dialog ref="searchDialog"></search-dialog>
  </v-app>
</template>

<script>
import SearchDialog from "~/components/SearchDialog.vue";

export default {
  components: {
    SearchDialog,
  },
  data() {
    return {
      fixed: true,
      title: "アンケートチャンネル",
    };
  },
  methods: {
    navigateIndexPage: function () {
      this.$router.push("/");
    },
    toggleSearchDialog: function () {
      this.$refs.searchDialog.toggle();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  font-family: "M PLUS Rounded 1c", sans-serif;

  ::v-deep .v-toolbar__content {
    border-bottom: solid 1px !important;
    border-color: #e4e4e4 !important;
  }
}
</style>
