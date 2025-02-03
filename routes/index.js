const dogsApi = require('../routes/dogs.js');
const mailerApi = require('../routes/mailer.js');
const userApi = require('../routes/activate-user.js');
const loginApi = require('../routes/login.js');

function controllers(app) {
    dogsApi(app);
    mailerApi(app);
    userApi(app);
    loginApi(app);
}

module.exports = controllers;
