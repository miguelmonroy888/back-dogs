const express = require('express');
const LoginService = require('../services/login');

function loginApi(app) {
    const router = express.Router();
    app.use("/api/login", router);

    const loginService = new LoginService();

    router.post("/", async function (req, res, next) {
        const { body: user } = req;
        try {
            const usr = await loginService.getUser(user.mail);
            if (usr.mail === user.mail && usr.password === user.pass && usr.status === true) {
                res.status(200).json({
                    data: usr,
                    message: 'user to login'
                });
            } else {
                res.status(200).json({ //should be 403 but frontend does not have implementation that manage errors returned by backend TODO
                    data: usr,
                    message: 'access deny'
                });
            }
        } catch (err) {
            next(err);
        }
    });

}

module.exports = loginApi;