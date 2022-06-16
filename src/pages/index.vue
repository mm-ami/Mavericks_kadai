<template>
  <section>
    <div v-if="!$auth.loggedIn" class="no_login">
      <h1>Memo</h1>
      <nuxt-link to="authentication/login">ログイン画面へ</nuxt-link>
    </div>

    <div v-else>
      <div class="addicon_container">
        <!-- 追加ボタン -->
        <nuxt-link to="addmemo" class="addicon"><fa :icon="faPlus" /></nuxt-link>
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
            <edit-additional :memobody.sync="toEditAdditionalComponents"></edit-additional>
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
      memoId: ''
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
    // vue-final-modalを開き、クリックされたメモの文章とidをdataに格納
    editModalOpen(memo) {
      this.editmModalWindow = !this.editmModalWindow;
      this.toEditAdditionalComponents = memo.body;
      this.memoId = memo.id;
    },

    // メモの編集
    async editMemo() {
      await this.$axios.post('/edit', {id: this.memoId, userId: this.$auth.user.user.id, body: this.toEditAdditionalComponents})
      .then((res) => {
        location.reload();
      })
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

.no_login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: $backcolor;
  padding: 70px;

  h1 {
    font-size: 3rem;
  }

  a {
    display: block;
    color: $keycolor;
    font-size: 1.3rem;

    &:hover {
      text-decoration: underline;
    }
  }

  h1, a {
    text-align: center;
  }
}

.addicon_container {
  text-align: center;

  .addicon {
    font-size: 2rem;
    padding: 12px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%);
    background-color: $backcolor;
    color: $keycolor;
  }
}

.memo {
  margin: 20px 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  &_list {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%);
    padding: 8px;
    height: 250px;
    background-color: $backcolor;
    overflow: scroll;
  }

  &_button {
  text-align: right;

    button {
      font-size: 1.7rem;
      padding-left: 2px;
      color: $keycolor;
    }
  }

  &_body {
    font-size: 2rem;
  }

  &_edit {
    @include transform;

    input {
      @include input;

      &:hover {
        @include inputhover;
      }
    }
  }
}

</style>
