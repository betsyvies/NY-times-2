const express = require('express');
const app = express();
const server = app.listen(3000, turnOn);

function turnOn() {
  console.log('Server on');
}

app.use(express.static('public')); 