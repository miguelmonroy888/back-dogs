const express = require('express');
const MailerService = require('../services/mailer');
const LoginService = require('../services/login');
const User = require('../interfaces/user');
const Email = require('../interfaces/email');
const jwt = require('jwt-simple');
const moment = require('moment');
const { ObjectId } = require('bson');

function mailerApi(app) {
    const router = express.Router();
    app.use("/api/register", router);

    const mailerService = new MailerService();
    const loginService = new LoginService();

    router.post("/", async function (req, res, next) {
        const { body: data } = req;

        try {
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            const payloadJWT = {
                sub: randomNumber,
                iat: moment().unix(),
                exp: moment().add(10, 'm').unix()
            }
            const token = jwt.encode(payloadJWT, 'dog', 'HS256');
            const newUser = User;
            const email = Email;
            const key =  Math.random() * (10 - 1) + 1;
            newUser._id = ObjectId(key);
            newUser.name = data.name;
            newUser.lastname = data.lastname;
            newUser.mail = data.mail;
            newUser.password = data.pass;
            newUser.status = false;
            newUser.token = token;
            email.subject = 'Registration Token';
            email.msg = `Your verification token is: ${randomNumber}`;
            email.email = newUser.mail;
            const send = await mailerService.sendMail(email);
            if (send.response) {
                const userAlreadyExists = await loginService.getUser(email.email);
                if (userAlreadyExists.mail !== email.email) {
                    const insert = await mailerService.createUser(newUser);
                    send.insert = insert;
                    res.status(200).json({
                        data: send,
                        message: 'User created and email sended'
                    });
                } else {
                    res.status(200).json({
                        data: {},
                        message: 'User already exists'
                    });
                }
            }
        } catch (err) {
            next(err);
        }
    });

}

module.exports = mailerApi;