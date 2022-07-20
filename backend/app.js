const { application } = require('express');
const userRoutes = require ('./routes/user');
const path = require('path');

app.use('/api/auth',userRoutes);
app.use('/api/sauces', saucesRoutes);


app.use((req, res, next) => {      
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('images', express.static(path.join(_dirname, 'images')));   //allows which static folder to serve


module.exports = app;