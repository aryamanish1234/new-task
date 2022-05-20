const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use((bodyParser.urlencoded({ extended: true })))
const authRouter = require('./router/test');
const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test2", () => {
    console.log("Mongoose Connected ")
})

app.use('/', authRouter);

app.listen(4000, () => {
    console.log("Server is Start at 4000");
})