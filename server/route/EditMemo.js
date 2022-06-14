const router = require('express').Router();
// const ConnectionPool = require('../db/connection');

router.post('/', (req, res) => {


  // try {

  //   const userId = req.body.userId;
  //   const memoBody = req.body.memobody;
  
  //   const sql = 'UPDATE memo SET ? WHERE user_id = ?';
  //   const insert = [{body: memoBody}, userId]
  
  //   await ConnectionPool.query(sql, insert);

  //   return res.sendStatus(200);

  // } catch (error) {
    
  //   return res.sendStatus(400);

  // }

})

module.exports = router;