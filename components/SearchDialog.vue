<template>
  <v-dialog v-model="searchDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">検索</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              v-model="keyword"
              :rules="keywordRule"
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
            <v-chip-group column mandatory>
              <v-chip
                filter
                outlined
                v-for="category in categories"
                :key="category.categoryId"
                @click="selectCategory(category.categoryId)"
              >{{ category.categoryName }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="searchDialog = false">キャンセル</v-btn>
        <v-btn text @click="validate">実行</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchDialog: false,
      valid: false,
      keyword: "",
      keywordRule: [
        (v) => v.length <= 250 || "キーワードは250文字以内で入力して下さい",
      ],
      sortTypes: [
        { sortName: "新着", sortId: 0 },
        { sortName: "票数(１ヶ月)", sortId: 1 },
        { sortName: "票数(全期間)", sortId: 2 },
      ],
      sortId: 0,
      categories: [
        { categoryName: "すべて", categoryId: 0 },
        { categoryName: "恋愛・結婚", categoryId: 1 },
        { categoryName: "芸能", categoryId: 2 },
        { categoryName: "仕事", categoryId: 3 },
        { categoryName: "漫画・アニメ・本", categoryId: 4 },
        { categoryName: "音楽", categoryId: 5 },
        { categoryName: "政治・経済", categoryId: 6 },
        { categoryName: "生活", categoryId: 7 },
        { categoryName: "スポーツ", categoryId: 8 },
        { categoryName: "その他", categoryId: 99 },
      ],
      categoryId: 0,
    };
  },
  methods: {
    toggle: function () {
      this.searchDialog = !this.searchDialog;
    },
    selectCategory: function (categoryId) {
      this.categoryId = categoryId;
    },
    validate: function () {
      if (this.$refs.form.validate()) {
        this.search();
      }
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
