const express = require('express');
const app = express();
const path = require('path');
const dashBoard = require('./ROUTES/dashboard.routes');
const addBoard = require('./ROUTES/add-artilces');
//const search = require('./ROUTES/searchroutes');
const mysql2 = require('mysql2');




app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))   // for static file and can call css file


app.set('view engine', 'ejs'); // for identaction the type of engine


const query =mysql2.createConnection({
    host: 'localhost',
    database: 'xyz',
    user: 'root',
    password: ''
})

/***** get  data ***** */
app.get('/', (req, res) => {


   query.execute(`select * from articles`,(err,articules)=>{
       if(err)
       {
           res.json({err:"its an error .."})
       }
       else
       {
           //res.json(result);
           res.render('users.ejs',{articules});
           console.log(articules)
       }
   })


});

/***** read data ***** */
app.get('/readMore/:id',(req,res)=>{
    query.execute(`select * from articles where id=${req.params.id}`,(err,result)=>{
        if(err)
        {
            res.json({err:"its an error .."})
        }
        else
        {
            res.render('readmore.ejs',{result:result[0]});
        }
    })
})



app.use(dashBoard)
app.use(addBoard)
//app.use(search)


app.listen(3000, () => {
    console.log("here.....");
}
);