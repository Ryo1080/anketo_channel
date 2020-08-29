<template>
  <v-dialog v-model="createAnketoDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">アンケートを作成する</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field v-model="title" label="タイトル" single-line></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="description" filled name="input" label="説明文" value hint></v-textarea>
          </v-col>
          <v-col cols="12" v-for="(label, index) in optionLabels" :key="index">
            <v-text-field v-model="optionValues[index]" :placeholder="label"></v-text-field>
          </v-col>
        </v-row>

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
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createAnketoDialog = false">キャンセル</v-btn>
        <v-btn text @click="createAnketo">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createAnketoDialog: false,
      title: "",
      description: "",
      optionLabels: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      optionValues: ["", "", "", ""],
      categories: [
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
      categoryId: 99,
    };
  },
  methods: {
    toggle: function () {
      this.createAnketoDialog = !this.createAnketoDialog;
    },
    selectCategory: function (categoryId) {
      this.categoryId = categoryId;
    },
    createAnketo: async function () {
      const payload = {
        title: this.title,
        description: this.description,
        anketoOptions: this.optionValues,
        categoryId: this.categoryId,
      };
      await this.$store.dispatch("createAnketosAction", payload);
      this.toggle();
    },
  },
};
</script>
