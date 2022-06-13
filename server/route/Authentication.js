// ログイン認証 ユーザー認証
const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const ConnectionPool = require('../db/connection');

// ユーザー認証
router.post('/register', async (req, res) => {

  try {

    const username = req.body.username;
    const password = req.body.password;
  
    const sql = 'INSERT INTO memo_users SET ?';
  
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    await ConnectionPool.query(sql, {name: username, password: hashedPassword});

    return res.sendStatus(200);

  } catch (error) {

    return res.sendStatus(401);

  }

})

// ログイン
router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = 'SELECT * FROM memo_users WHERE ?';

    const usernameSelect = await ConnectionPool.query(sql, {name: username});

    await bcrypt.compare(password, usernameSelect[0].password);

    const payload = { id: usernameSelect[0].id }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

    return res.json({token});

  } catch (error) {

    return res.sendStatus(401);

  }
})

router.get('/user', async (req, res) => {

  const token = await req.headers.authorization.split(" ")[1];

  if(!token) return res.sendStatus(401);

  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

    if(error) return res.sendStatus(403);

    return res.json({user});

  })

})

module.exports = router;