
const path = require('path');
const dashBoard = require('express').Router();
const mysql2 = require('mysql2');



const query = mysql2.createConnection({
  host: 'localhost',
  database: 'xyz',
  user: 'root',
  password: ''
})

/***** get data ***** */

dashBoard.get('/dashboard', (req, res) => {
  query.execute(`select * from articles`, (err, articules) => {
    if (err) {
      res.json({ err: "its an error .." })
    }
    else {
      res.render('dashboard.ejs', { articules });
    }
  })
});

/***** edit  data ***** */

dashBoard.get('/edit/:id', (req, res) => {
  query.execute(`select * from articles WHERE id =${req.params.id}`, (err, art) => {
    if (err) {
      res.json({ err: "error..." })
    }
    else
      res.render('edit.ejs', { art: art[0] })
    console.log({ art: art[0] })
  })
});


/***** delete  data ***** */
dashBoard.get('/delete/:id', (req, res) => {
  query.execute(`DELETE FROM articles WHERE id=${req.params.id}`);
  res.redirect("/dashboard");

})

/***** update  data ***** */
dashBoard.post('/update/:id', (req, res) => {
  query.execute(`UPDATE articles set topic='${req.body.topic}',content='${req.body.content}' WHERE id='${req.params.id}'`);
  res.redirect("/dashboard");

})




module.exports = dashBoard