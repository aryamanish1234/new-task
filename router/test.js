const express = require('express');
const app = express();

const authControllers = require('../controllers/test');
const verifyToken = require('../middleware/verifytoken');


app.post('/test/signup', authControllers.signup);
app.post('/test/sign', authControllers.signIn);
app.get('/test/all', verifyToken.verifyToken, authControllers.allUsers);


module.exports = app;