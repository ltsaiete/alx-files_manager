import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

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
    const passwordHash = sha1(password);
    const result = await this.collection.insertOne({ email, password: passwordHash });
    return result.insertedId;
  }
}

export default new UserRepository();
