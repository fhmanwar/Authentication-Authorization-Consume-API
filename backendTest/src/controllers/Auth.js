const authModel = require('../models/authModel');

const config = require('../config');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signin = async (req, res, next) => {
    try {
        console.log(req.body.password);
        const [status, data] = await authModel.getUser(req.body.username, next);
        console.log(data);
        if (status < 1) {
            return res.status(200).json({
                code: status,
                msg: "User Not Found",
                data: [],
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        );
    
        if (!passwordIsValid) {
            return res.status(401).send({
                code: status,
                msg: "Invalid Password!",
                data: {
                    Name: data.name,
                    username: data.username,
                    accessToken: null
                },
            });
        }

        const token = jwt.sign({ id: data.id, username: data.username }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: {
                Name: data.name,
                username: data.username,
                accessToken: token
            },
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

const signup = async (req, res, next) => {
    try {
        console.log(req.body.id);
        var uname = req.body.username;
        var pass = bcrypt.hashSync(req.body.password, 8);
        const [status, data] = await authModel.add(uname, pass, next);
        console.log(data);
        if (status < 1) {
            return res.status(200).json({
                code: status,
                msg: "User was not registered!",
                data: data,
            });
        }

        const token = jwt.sign({ id: data.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: {
                Name: data.name,
                username: data.username,
                accessToken: token
            },
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    signin,
    signup,
}