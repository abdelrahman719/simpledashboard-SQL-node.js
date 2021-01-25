
const path = require('path');
const addBoard = require('express').Router();
const mysql2 = require('mysql2');



const query =mysql2.createConnection({
  host: 'localhost',
  database: 'xyz',
  user: 'root',
  password: ''
})

/***** add new articles  data ***** */
addBoard.get('/addArticles',(req,res)=>{

  res.render('addArt.ejs')
})

/***** send new  data ***** */
addBoard.post('/send', (req, res) => {
    query.execute (`INSERT INTO articles (topic, content) VALUES ( '${req.body.topic}','${req.body.content}')`);
     res.redirect('/dashboard')
    
});

module.exports = addBoard;