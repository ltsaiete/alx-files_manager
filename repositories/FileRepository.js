import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

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

  async findByIdAndUser(id, userId) {
    const file = await this.collection.findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
    return file;
  }

  async find({ parentId, page, userId }) {
    const files = await this.collection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
            parentId: Number(parentId) === 0 ? 0 : new ObjectId(parentId)
          }
        },
        {
          $project: {
            id: { $toString: '$_id' },
            name: 1,
            type: 1,
            parentId: 1,
            isPublic: 1,
            userId: 1,
            localPath: 1
          }
        },
        {
          $skip: page * 20
        },
        {
          $limit: 20
        }
      ])
      .toArray();
    return files;
  }

  async create({ name, type, parentId = 0, isPublic = false, userId, localPath }) {
    const file = {
      name,
      type,
      parentId: Number(parentId) === 0 ? 0 : new ObjectId(parentId),
      isPublic,
      userId: new ObjectId(userId),
      localPath
    };
    const result = await this.collection.insertOne(file);
    return result.insertedId;
  }

  async update({ _id, isPublic }) {
    await this.collection.updateOne({ _id: new ObjectId(_id) }, { $set: { isPublic } });
  }
}

const fileRepository = new FileRepository();

export default fileRepository;
