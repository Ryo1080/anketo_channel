<template>
  <div>
    <v-container>
      <v-list three-line>
        <v-subheader v-text="listTitle"></v-subheader>
        <div v-for="(anketo, index) in anketos" :key="index">
          <v-list-item :key="'anketo' + anketo.id" @click="navigateAnketoPage(anketo.id)">
            <v-list-item-avatar tile>
              <v-img :src="imagePath"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="anketo.title"></v-list-item-title>
              <v-list-item-subtitle v-html="anketo.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" :inset="true"></v-divider>
        </div>
      </v-list>
    </v-container>
    <v-btn
      rounded
      color="primary"
      fixed
      right
      bottom
      large
      @click="toggleCreateAnketoDialog"
    >アンケート作成</v-btn>
    <create-anketo-dialog ref="createAnketoDialog" @update-anketos="updateAnketos"></create-anketo-dialog>
    <search-dialog ref="searchDialog" @update-anketos="updateAnketos($event)"></search-dialog>
  </div>
</template>

<script>
import CreateAnketoDialog from "~/components/CreateAnketoDialog.vue";
import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1";

export default {
  components: {
    CreateAnketoDialog,
  },
  async asyncData({ params }) {
    const { data } = await axios.get(`${baseUrl}/anketo`);
    return { anketos: data.anketos };
  },
  data() {
    return {
      listTitle: "アンケートリスト",
      imagePath: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    };
  },
  methods: {
    navigateAnketoPage: function (anketoId) {
      this.$router.push(`/anketos/${anketoId}`);
    },
    toggleCreateAnketoDialog: function () {
      this.$refs.createAnketoDialog.toggle();
    },
    updateAnketos: async function () {
      const { data } = await axios.get(`${baseUrl}/anketo`);
      this.anketos = data.anketos;
    },
    updateAnketos: function (anketos) {
      console.log("test");
    },
  },
};
</script>
