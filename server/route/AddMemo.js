const router = require('express').Router();
const ConnectionPool = require('../db/connection');

// メモの追加
router.post('/', async (req, res) => {

  const userId = req.body.userId;
  const memoBody = req.body.memobody;

  const sql = 'INSERT INTO memo SET ?';

  await ConnectionPool.query(sql, {user_id: userId, body: memoBody})
  .then(() => {
    return res.sendStatus(200);
  })
  .catch(() => {
    return res.sendStatus(400);
  })

})

// メモの一覧取得
router.post('/memolistfetch', async (req, res) => {

  const userId = req.body.id;
  
  const sql = 'SELECT id, user_id, body FROM memo WHERE del_flg = 0 AND ?';

  await ConnectionPool.query(sql, {user_id: userId})
  .then((result) => {
    res.json({result});
  })
  .catch(() => {
    res.sendStatus(400);
  })

})

module.exports = router;