const MongoLib = require('../lib/mongo');

class UserService {

  constructor() {
    this.collection = 'dogs';
    this.mongoDB = new MongoLib();
  }

  async getUser(id) {
      const user = await this.mongoDB.getUser(this.collection, id);
      return user || {};
  }

  async updateUser(user, id) {
    const usr = await this.mongoDB.updateUser(this.collection, id, user);
    return usr || {};
    }
  
}

module.exports = UserService;