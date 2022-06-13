const router = require('express').Router();
const ConnectionPool = require('../db/connection');

router.post('/', async (req, res) => {

  const id = req.body.id;
  const userId = req.body.user_id;

  const sql = 'UPDATE memo SET del_flg = 1 WHERE id = ? AND user_id = ?'

  await ConnectionPool.query(sql, [id, userId])
  .then(() => {
    res.status(200);
  })
  .catch(() => {
    res.sendStatus(400);
  })

})

module.exports = router;