const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/key');
const app = express();

mongoose.connect(key.mongoURI, {
   useNewUrlParser: true
});

app.get('/', (req, res) => {
   res.send({hi: 'bro'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);