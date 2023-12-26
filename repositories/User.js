import sha1 from 'sha1';
import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

class UserRepository {
  constructor() {
    dbClient.collection('users').then((collection) => {
      this.collection = collection;
    });
  }

  async getUserByEmail(email) {
    const user = await this.collection.findOne({ email });
    return user;
  }

  async getUserById(id) {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user;
  }

  async insertUser(email, password) {
    const password_hash = sha1(password);
    const result = await this.collection.insertOne({ email, password: password_hash });
    return result.insertedId;
  }
}

export default new UserRepository();
