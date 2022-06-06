const User = require("../models/index").user;
const generateToken = require("../middleware/authentication").generateToken;
const bcrypt = require("bcrypt");

exports.signUp = async(req, res) => {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;

    User.findOne({
            where: {
                email: email,
                username: username,
            },
        })
        .then((user) => {
            if (user) {
                return res.status(400).send({
                    message: "Email or username already Exist",
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            User.create({
                    full_name: full_name,
                    email: email,
                    username: username,
                    password: hash,
                    profile_image_url: profile_image_url,
                    age: age,
                    phone_number: phone_number,
                })
                .then((user) => {
                    const data = {
                        id: user.id,
                        email: email,
                        full_name: full_name,
                        username: username,
                        profile_image_url: profile_image_url,
                        age: age,
                        phone_number: phone_number,
                    };
                    const token = generateToken(data);
                    res.status(201).send({
                        token: token,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(503).json({
                        message: "INTERNAL SERVER ERROR",
                        error: error,
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.signIn = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({
            where: {
                email: email,
            },
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "email not found",
                });
            }
            const passwordValid = bcrypt.compareSync(password, user.password);
            if (!passwordValid) {
                return res.status(401).json({
                    message: "password and email not match",
                });
            }
            const data = {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                username: user.username,
                profile_image_url: user.profile_image_url,
                age: user.age,
                phone_number: user.phone_number,
            };
            const token = generateToken(data);
            res.status(200).send({
                token: token,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.updateUser = async(req, res) => {
    const userId = req.params.userId;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const dataUser = {
        full_name: full_name,
        email: email,
        username: username,
        profile_image_url: profile_image_url,
        age: age,
        phone_number: phone_number,
    };

    await User.update(dataUser, {
            where: { id: userId },
            returning: true,
        })
        .then(() => {
            res.status(200).json({
                user: dataUser,
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.deleteUser = async(req, res) => {
    const userId = req.params.userId;
    await User.destroy({ where: { id: userId } })
        .then(() => {
            res.status(200).json({
                message: "Your account has been succesfully deleted",
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};