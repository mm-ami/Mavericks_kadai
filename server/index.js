const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ユーザー認証 ログイン認証
app.use("/authentication", require("./route/Authentication"));

// メモの追加 & メモの一覧取得
app.use("/add", require("./route/AddMemo"));

// メモの編集
app.use("/edit", require("./route/EditMemo"));

// メモの削除
app.use("/delete", require("./route/DeleteMemo"));

// express
export default app;