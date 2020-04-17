const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/key');
const app = express();

mongoose.connect(key.mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});

//init middleware
app.use(express.json({extended: false}));


//Define routes
app.use('/', require('./routes/api/feed'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/feed', require('./routes/api/feed'));
app.use('/api/followers', require('./routes/api/followers'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/show', require('./routes/api/show'));
app.use('/api/comments', require('./routes/api/comments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);