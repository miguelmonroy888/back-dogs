const MongoLib = require('../lib/mongo');

class LoginService {

  constructor() {
    this.collection = 'dogs';
    this.mongoDB = new MongoLib();
  }

  async getUser(email) {
      const user = await this.mongoDB.getUserByEmail(this.collection, email);
      return user || {};
  }
  
}

module.exports = LoginService;