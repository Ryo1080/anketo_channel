<template>
  <div>
    <v-list three-line>
      <v-subheader v-text="listTitle"></v-subheader>
      <div v-for="(anketo, index) in $store.state.anketo.anketos" :key="index">
        <v-list-item
          :key="'anketo' + anketo.id"
          @click="navigateAnketoPage(anketo.id)"
        >
          <div v-if="anketo.image.url">
            <v-list-item-avatar tile>
              <v-img :src="anketo.image.url"></v-img>
            </v-list-item-avatar>
          </div>
          <div v-else>
            <v-list-item-avatar tile>
              <v-img :src="defaultImage"></v-img>
            </v-list-item-avatar>
          </div>

          <v-list-item-content>
            <v-list-item-subtitle v-html="anketo.title"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
              v-text="anketo.voteCount + '票'"
            ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="index" :inset="true"></v-divider>
      </div>
    </v-list>
    <v-btn
      rounded
      color="primary"
      fixed
      right
      bottom
      large
      @click="toggleCreateAnketoDialog"
      >アンケート作成</v-btn
    >
    <create-anketo-dialog ref="createAnketoDialog"></create-anketo-dialog>
  </div>
</template>

<script>
import CreateAnketoDialog from "~/components/CreateAnketoDialog.vue";

export default {
  components: {
    CreateAnketoDialog,
  },
  async asyncData({ params, store }) {
    if (!store.state.anketo.anketos.length) {
      const payload = {
        keyword: "",
        sortId: 2,
        categoryId: 0,
      };
      await store.dispatch("anketo/searchAnketosAction", payload);
    }
  },
  data() {
    return {
      listTitle: "アンケートリスト",
      defaultImage: require("@/assets/graph07_bou2.png"),
    };
  },
  methods: {
    navigateAnketoPage: function (anketoId) {
      this.$router.push(`/anketos/${anketoId}`);
    },
    toggleCreateAnketoDialog: function () {
      this.$refs.createAnketoDialog.toggle();
    },
  },
};
</script>
