<template>
  <v-dialog v-model="searchDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">検索</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              v-model="keyword"
              label="キーワード"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              :items="sortTypes"
              item-text="sortName"
              item-value="sortId"
              v-model="sortId"
              label="並び順"
            ></v-select>
          </v-col>

          <v-card-text>
            <h2 class="title mb-2">カテゴリ選択</h2>
            <v-chip-group column mandatory v-model="categoryId">
              <v-chip filter outlined v-for="category in categories" :key="category">{{ category }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="searchDialog = false">キャンセル</v-btn>
        <v-btn text @click="search">実行</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchDialog: false,
      keyword: "",
      sortTypes: [
        { sortName: "新着", sortId: 0 },
        { sortName: "人気(１ヶ月)", sortId: 1 },
        { sortName: "人気(全期間)", sortId: 2 },
      ],
      sortId: 0,
      categories: [
        "すべて",
        "恋愛・結婚",
        "芸能",
        "仕事",
        "漫画・アニメ・本",
        "音楽",
        "政治・経済",
        "生活",
        "スポーツ ",
        "その他",
      ],
      categoryId: 0,
    };
  },
  methods: {
    toggle: function () {
      this.searchDialog = !this.searchDialog;
    },
    search: async function () {
      const payload = {
        keyword: this.keyword,
        sortId: this.sortId,
        categoryId: this.categoryId,
      };
      await this.$store.dispatch("searchAnketosAction", payload);
      this.toggle();
    },
  },
};
</script>
