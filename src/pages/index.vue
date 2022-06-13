<template>
  <section>

    <div v-if="!$auth.loggedIn" class="no_login">
      <h1>Memo</h1>
      <nuxt-link to="authentication/login">ログイン画面へ</nuxt-link>
    </div>

    <div v-else>
      <div class="addicon_container">
        <nuxt-link to="memoadd" class="addicon"><fa :icon="faPlus" /></nuxt-link>
      </div>

      <div class="memo">
        <div v-for="memo in memoList" :key="memo.id" class="memo_list">
          <div class="memo_button">
            <!-- 編集ボタン -->
            <button @click="editModalOpen(memo)"><fa :icon="faPenToSquare" /></button>
            <!-- ゴミ箱ボタン -->
            <button @click="deleteMemo(memo)"><fa :icon="faTrash" /></button>
          </div>
          <div class="memo_body">{{memo.body}}</div>
        </div>
      </div>

      <!-- 編集ボタンを押したら表示されるmodalウィンドウ  -->
      <client-only>
        <vue-final-modal v-model="editmModalWindow" style="cursor: pointer">
          <div class="memo_edit">
            <!-- 編集ボタンを押したメモのbody(書き出した文章)を子componentsに渡したい。 -->
            <edit-additional :memobody.sync="toEditAdditionalComponents"></edit-additional>
            <!-- 子componetntsから変更されて返ってきた値をeditMemo()で処理したい。 -->
            <input type="submit" value="変更を登録する" @click.prevent="editMemo()">
          </div>
        </vue-final-modal>
      </client-only>
    </div>

  </section>
</template>

<script>
import { faPlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditAdditional from "../components/EditAdditionalForm.vue";

export default {
  name: 'IndexPage',

  components: {
    EditAdditional,
  },

  data() {
    return {
      editmModalWindow: false,
      memoList: [],
      toEditAdditionalComponents: '',
    }
  },

  // fortawesome
  computed: {
    faPlus() {
      return faPlus
    },
    faTrash() {
      return faTrash
    },
    faPenToSquare() {
      return faPenToSquare
    }
  },

  async mounted() {
    // ログイン済みならメモ一覧を取得する
    if(this.$auth.loggedIn) {
      await this.$axios.post('/add/memolistfetch', this.$auth.$state.user.user)
      .then((res) => {
        this.memoList = res.data.result;
      })
    }
  },

  methods: {
    // メモの編集
    async editModalOpen(memo) {
      this.editmModalWindow = !this.editmModalWindow;
      this.toEditAdditionalComponents = memo.body;
      await this.$axios.post("/edit", {id: memo.id, user_id: memo.user_id, body: this.toEditAdditionalComponents})
      .then((res) => {
        console.log(res);
      })
    },

    async editMemo() {

    },

    // メモの削除
    async deleteMemo(memo) {
      await this.$axios.post('/delete', memo)
      .then(() => {
        location.reload();
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
