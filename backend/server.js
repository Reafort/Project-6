const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const path = require ('path');

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Method", "PUT, GET, DELETE, POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, authorization, Content, X-Requested-With")
    next()
  })
// routes

app.use('/images', express.static(path.join(__dirname, 'images')));   //allows which static folder to serve

//const userId = require('./routes/user')
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)


// connect to mongose 

mongoose.connect('mongodb+srv://Reafort:Rcfr6783@cluster0.bqxzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log('sucessfully connected to MongoDB!')
}).catch((error)=>{
    console.log('Failed connecting to MongoDB');
    console.error(error);
});

app.listen(3000, function () {
    console.log('test');
});