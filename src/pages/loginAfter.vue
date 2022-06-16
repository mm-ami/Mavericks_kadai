<template>
  <section>
    <div class="addicon_container">
      <!-- 追加ボタン -->
      <nuxt-link to="addMemo" class="addicon"><fa :icon="faPlus" /></nuxt-link>
    </div>

    <div class="memo">
      <div v-for="memo in memoList" :key="memo.id" class="memo_list">
        <div class="memo_button">
          <!-- 編集ボタン -->
          <button @click="editModalOpen(memo)"><fa :icon="faPenToSquare" /></button>
          <!-- 削除ボタン -->
          <button @click="deleteMemo(memo)"><fa :icon="faTrash" /></button>
        </div>
        <div class="memo_body">{{memo.body}}</div>
      </div>
    </div>

    <!-- 編集ボタンを押したら表示されるモーダルウィンドウ  -->
    <client-only>
      <vue-final-modal v-model="editmModalWindow" style="cursor: pointer">
        <div class="memo_edit">
          <edit-additional :memobody.sync="toEditAdditionalComponents"></edit-additional>
          <input type="submit" value="変更を登録する" @click.prevent="editMemo()">
        </div>
      </vue-final-modal>
    </client-only>
  </section>
</template>

<script>
import { faPlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditAdditional from "../components/EditAdditionalForm.vue";

export default {
  name: 'LoginAfter',

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
    await this.$axios.post('/add/memolistfetch', this.$auth.$state.user.user)
    .then((res) => {
      this.memoList = res.data.result;
    })
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

<style lang="scss">

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

  @include tab {
    grid-template-columns: repeat(2, 1fr);
  }

  @include phone {
    grid-template-columns: 1fr;
  }

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