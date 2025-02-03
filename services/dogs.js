const axios = require('axios');
const MongoLib = require('../lib/mongo');

class DogsService {

  constructor() {
    this.collection = 'favorite_dog';
    this.mongoDB = new MongoLib();
  }

  async getBreeds() {
    return await axios.get('https://dog.ceo/api/breeds/list/all') || [];
  }

  async randomImage() {
    return await axios.get('https://dog.ceo/api/breeds/image/random') || {};
  }

  async randomImages() {
    return await axios.get('https://dog.ceo/api/breeds/image/random/4') || {};
  }

  async getFavoriteDog(email) {
    const dog = await this.mongoDB.getFavoriteDogByEmailUser(this.collection, email);
    return dog || {};
  }

  async createFavoriteDog(email) {
    const favoriteDog = await this.mongoDB.createUser(this.collection, email);
    return favoriteDog;
  }

  async updateFavoriteDog(obj) {
    const newDog = await this.mongoDB.updateByEmail(this.collection, obj);
    return newDog || {};
    }

}

module.exports = DogsService;