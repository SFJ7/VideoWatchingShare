const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/key');
const app = express();

mongoose.connect(key.mongoURI, {
   useNewUrlParser: true
});

//init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
   res.send({hi: 'bro'})
});

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/feed', require('./routes/api/feed'));
app.use('/api/friends', require('./routes/api/friends'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/show', require('./routes/api/show'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);