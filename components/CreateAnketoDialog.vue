<template>
  <v-dialog v-model="createAnketoDialog" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">アンケートを作成する</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field v-model="title" label="タイトル" :rules="titleRule" single-line></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="description"
              filled
              name="input"
              label="説明文"
              :rules="descriptionRule"
              value
              hint
            ></v-textarea>
          </v-col>
          <v-col cols="12" v-for="(value, index) in optionValues" :key="index">
            <v-text-field
              v-model="optionValues[index]"
              :placeholder="'選択肢' + (index + 1)"
              :rules="optionRule"
            ></v-text-field>
          </v-col>
          <v-btn class="ma-2" outlined color="indigo" @click="addOption">選択肢追加</v-btn>
          <v-btn class="ma-2" outlined color="error" @click="removeOption">選択肢削除</v-btn>
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
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="createAnketoDialog = false">キャンセル</v-btn>
        <v-btn text @click="validate">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      createAnketoDialog: false,
      valid: false,
      title: "",
      titleRule: [
        (v) => !!v || "タイトルは必須です",
        (v) => (v && v.length <= 50) || "タイトルは50文字以内で入力して下さい",
      ],
      description: "",
      descriptionRule: [
        (v) => (v && v.length <= 250) || "説明文は250文字以内で入力して下さい",
      ],
      optionValues: ["", ""],
      optionRule: [
        (v) => !!v || "オプション名は必須です",
        (v) =>
          (v && v.length <= 50) || "オプション名は50文字以内で入力して下さい",
      ],
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
    addOption: function () {
      if (this.optionValues.length < 8) {
        this.optionValues.push("");
      }
    },
    removeOption: function () {
      if (this.optionValues.length > 1) {
        this.optionValues.pop();
      }
    },
    validate: function () {
      if (this.$refs.form.validate()) {
        this.createAnketo();
      }
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
