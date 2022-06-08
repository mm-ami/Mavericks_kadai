const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'))

// ユーザー認証 ログイン認証
app.use("/authentication", require("./route/LoginRegister"))

// express
export default app;