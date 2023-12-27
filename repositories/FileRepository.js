import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

class FileRepository {
  constructor() {
    dbClient.collection('files').then((collection) => {
      this.collection = collection;
    });
  }

  async findById(id) {
    const file = await this.collection.findOne({ _id: new ObjectId(id) });
    return file;
  }

  async create({ name, type, parentId = 0, isPublic = false, userId, localPath }) {
    const file = { name, type, parentId, isPublic, userId: new ObjectId(userId), localPath };
    const result = await this.collection.insertOne(file);
    return result.insertedId;
  }
}

const fileRepository = new FileRepository();

export default fileRepository;
