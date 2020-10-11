<template>
  <v-container class="text-center">
    <section class="my-5">
      <h1>【アンケートチャンネルとは】</h1>
      <p class="mt-5">
        気軽にアンケートを作成・投票・コメントできる掲示板サイトです。<br />
        気になるアンケートがあれば投票してみよう。
      </p>
    </section>
    <section class="mt-15">
      <h1>【使い方】</h1>
      <section class="mt-5">
        <h3>アンケートを作成する</h3>
        <p>
          右下の「アンケートを作成」ボタンからアンケートを作成することができます。
        </p>
        <v-row align="center" justify="center">
          <v-card elevation-5>
            <v-img
              :src="anketoCreateImage"
              max-height="300"
              max-width="450"
            ></v-img>
          </v-card>
        </v-row>
      </section>

      <section class="mt-15">
        <h3>アンケートに投票する</h3>
        <p>
          　個別のアンケートページで、投票したい選択肢をクリックします。<br />
          「投票する」ボタンをクリックすることで投票できます。
        </p>
        <v-row align="center" justify="center">
          <v-card elevation-5>
            <v-img
              :src="anketoVoteImage"
              max-height="300"
              max-width="450"
            ></v-img>
          </v-card>
        </v-row>
      </section>

      <section class="mt-15">
        <h3>アンケートにコメントする</h3>
        <p>
          個別のアンケートページの右下の「コメントする」ボタンからコメントすることができます。
        </p>
        <v-row align="center" justify="center">
          <v-card elevation-5>
            <v-img
              :src="anketoCommentImage"
              max-height="300"
              max-width="450"
            ></v-img>
          </v-card>
        </v-row>
      </section>
    </section>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      anketoCreateImage: require("@/assets/anketo_create.png"),
      anketoVoteImage: require("@/assets/anketo_vote.png"),
      anketoCommentImage: require("@/assets/anketo_comment.png"),
    };
  },
  methods: {
    navigateUsagePage: function () {
      this.$router.push(`/anketos/${anketoId}`);
    },
  },
};
</script>
