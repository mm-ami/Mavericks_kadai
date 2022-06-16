const router = require('express').Router();
const ConnectionPool = require('../db/connection');

// メモの編集
router.post('/', async (req, res) => {

  const id = req.body.id;
  const userId = req.body.userId;
  const memoBody = req.body.body;

  const sql = 'UPDATE memo SET body = ? WHERE id = ? AND user_id = ?';

  await ConnectionPool.query(sql, [memoBody, id, userId])
  .then(() => {
    return res.sendStatus(200);
  })
  .catch(() => {
    return res.sendStatus(400);
  })

})

module.exports = router;