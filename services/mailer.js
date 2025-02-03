var nodemailer = require('nodemailer');
const MongoLib = require('../lib/mongo');

class MailerService {

  constructor() {
    this.collection = 'dogs';
    this.mongoDB = new MongoLib();
  }

  async sendMail(email) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dogs.project.management@gmail.com',
        pass: 'Dogs@!29042021'
      }
    });

    var mailOptions = {
      from: 'rigonzalez@udv.edu.gt',
      to: email.email,
      subject: email.subject,
      text: email.msg
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  }

  async createUser(newUser) {
    const userCreated = await this.mongoDB.createUser(this.collection, newUser);
    return userCreated;
  }
}

module.exports = MailerService;