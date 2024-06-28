import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { resolve } from 'path';
import fileRepository from '../repositories/FileRepository';
import userRepository from '../repositories/User';
import { FOLDER_PATH } from '../utils/env';
import { getUserId } from '../middlewares/auth';

export default class FilesController {
  static async postUpload(request, response) {
    const { userId } = request;
    const { name, type, parentId = 0, isPublic = false, data } = request.body;

    if (!name) return response.status(400).json({ error: 'Missing name' });
    if (!type || (type !== 'folder' && type !== 'file' && type !== 'image'))
      return response.status(400).json({ error: 'Missing type' });
    if (!data && type !== 'folder') return response.status(400).json({ error: 'Missing data' });

    if (parentId && Number(parentId) !== 0) {
      const parentFile = await fileRepository.findById(parentId);
      if (!parentFile) return response.status(400).json({ error: 'Parent not found' });
      if (parentFile.type !== 'folder') return response.status(400).json({ error: 'Parent is not a folder' });
    }

    if (type === 'folder') {
      const id = await fileRepository.create({
        name,
        type,
        parentId,
        isPublic,
        userId
      });
      return response.status(201).json({
        name,
        type,
        parentId,
        isPublic,
        userId,
        id
      });
    }

    const localPath = resolve(FOLDER_PATH, uuidv4());
    const content = Buffer.from(data, 'base64');

    await fs.promises.mkdir(resolve(FOLDER_PATH), { recursive: true });

    await fs.promises.writeFile(localPath, content);

    const id = await fileRepository.create({
      name,
      type,
      parentId,
      isPublic,
      userId,
      localPath
    });
    return response.status(201).json({
      name,
      type,
      parentId,
      isPublic,
      userId,
      id
    });
  }

  static async getShow(request, response) {
    const fileId = request.params.id;

    const { userId } = request;

    const user = await userRepository.getUserById(userId);

    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    const result = fileRepository.findByIdAndUser(fileId, userId);

    if (!result) return response.status(404).send({ error: 'Not found' });

    return response.status(200).send(result);
  }

  static async getIndex(request, response) {
    const { userId } = request;
    const { parentId = 0, page = 0 } = request.query;

    if (parentId !== 0) {
      const parentFolder = await fileRepository.findById(parentId);
      if (parentFolder.userId.toString() !== userId) return response.json([]);
    }

    const files = await fileRepository.find({ parentId, userId, page });

    return response.json(files);
  }

  static async putPublish(request, response) {
    const { userId } = request;
    const { id } = request.params;
    const file = await fileRepository.findById(id);

    if (!file || file.userId.toString() !== userId) return response.status(404).json({ error: 'Not found' });

    file.isPublic = true;
    file.id = file._id;
    await fileRepository.update(file);

    return response.json(file);
  }

  static async putUnpublish(request, response) {
    const { userId } = request;
    const { id } = request.params;
    const file = await fileRepository.findById(id);

    if (!file || file.userId.toString() !== userId) return response.status(404).json({ error: 'Not found' });

    file.isPublic = false;
    file.id = file._id;
    await fileRepository.update(file);

    return response.json(file);
  }

  static async getFile(request, response) {
    const { id } = request.params;
    const userId = await getUserId(request);

    const file = await fileRepository.findById(id);
    if (!file) return response.status(404).json({ error: 'Not found' });

    if (!file.isPublic && (!userId || file.userId.toString() !== userId))
      return response.status(404).json({ error: 'Not found' });
    if (file.type === 'folder') return response.status(400).json({ error: "A folder doesn't have content" });

    try {
      const data = await fs.promises.readFile(file.localPath);
      const content = data.toString();

      return response.send(content);
    } catch (error) {
      return response.status(404).json({ error: 'Not found' });
    }
  }
}
