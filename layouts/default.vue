<template>
  <v-app dark>
    <v-app-bar fixed app class="elevation-0" color="white">
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="font-weight-bold"
        center
        v-text="title"
        @click="navigateIndexPage"
      />
      <v-spacer></v-spacer>

      <template
        v-slot:extension
        v-if="$route.name === 'index' || $route.name === 'usage'"
      >
        <v-tabs centered v-model="tabIndex">
          <v-tab @click="search(2)" key="0"
            ><v-icon left color="yellow darken-2">mdi-crown</v-icon>人気</v-tab
          >
          <v-tab @click="search(0)" key="1"
            ><v-icon left color="green darken-2">mdi-clock-outline</v-icon
            >新着</v-tab
          >
          <v-tab @click="toggleSearchDialog" key="2"
            ><v-icon left color="purple darken-2">mdi-magnify</v-icon
            >探す</v-tab
          >
          <v-tab @click="navigateUsagePage" key="3"
            ><v-icon left color="orange darken-2"
              >mdi-help-circle-outline</v-icon
            >使い方</v-tab
          >
        </v-tabs>
      </template>
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
    navigateUsagePage: function () {
      this.$router.push("/usage");
    },
    toggleSearchDialog: function () {
      this.$refs.searchDialog.toggle();
    },
    search: async function (sortId) {
      const payload = {
        keyword: "",
        sortId: sortId,
        categoryId: 0,
      };
      await this.$store.dispatch("anketo/searchAnketosAction", payload);
      this.$router.push("/");
    },
  },
  computed: {
    tabIndex: {
      get() {
        return this.$store.state.tab.tabIndex;
      },
      set(value) {
        this.$store.dispatch("tab/changeTab", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  font-family: "M PLUS Rounded 1c", sans-serif;

  ::v-deep .v-tabs-bar__content {
    border-bottom: solid 1px !important;
    border-color: #e4e4e4 !important;
  }

  .v-toolbar__title {
    cursor: pointer;
    font-size: 1.5rem;
  }
}
</style>
