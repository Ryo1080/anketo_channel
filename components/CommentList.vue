<template>
  <v-container>
    <v-list three-line>
      <v-subheader v-text="listTitle"></v-subheader>
      <div v-for="(comment, index) in comments" :key="index">
        <v-list-item :key="'comment' + comment.id">
          <v-list-item-content>
            <v-list-item-title v-html="comment.timestamp"></v-list-item-title>
            <v-list-item-subtitle v-html="comment.comment"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </div>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: ["comments"],
  data() {
    return {
      listTitle: "コメント一覧",
    };
  },
};
</script>
