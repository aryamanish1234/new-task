const bcrypt = require("bcryptjs");
const { use } = require("express/lib/application");
const jwt = require("jsonwebtoken");
const User = require('../models/test');
const dotenv = require("dotenv");

dotenv.config();


exports.signup = async(req, res) => {
    const userData = {
        name: req.body.name,
        empId: req.body.empId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }
    console.log(userData);

    try {
        const userCreate = await User.create(userData);
        console.log(userCreate);

        Data = {
            name: userCreate.name,
            empId: userCreate.empId,
            email: userCreate.email,
            message: "Signup Done "
        }
        res.status(200).send(Data);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Internal Error",
            err: err.message
        })
    }
}

exports.signIn = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    try {


        if (user == null) {
            return res.status(400).send({
                message: "Faild ! Email doesn't exist "
            })
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid Password "
            })
        }
        console.log(process.env.SECRET)

        const token = jwt.sign({ id: user.empId }, process.env.SECRET);

        res.status(200).send({
            accessToken: token
        })
    } catch (err) {
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }


}

exports.allUsers = async(req, res) => {
    try {
        const UserDetails = await User.find();
        console.log(UserDetails)
        usersResponse = [];
        UserDetails.forEach(user => {
            usersResponse.push({
                name: user.name,
                empId: user.empId,
                email: user.email,

            })
        });
        res.status(200).json({
            Data: usersResponse
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Internal Error "
        })
    }
}