import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import userRepository from '../repositories/User';
import redisClient from '../utils/redis';
import AppError from '../errors/AppError';

export default class AuthController {
  static async getConnect(request, response) {
    const [, auth] = request.headers.authorization.split(' ');
    const decoded = Buffer.from(auth, 'base64').toString('ascii');
    const [email, password] = decoded.split(':');

    const user = await userRepository.getUserByEmail(email);

    if (!user) throw new AppError(401, 'Unauthorized');
    if (sha1(password) !== user.password) throw new AppError(401, 'Unauthorized');

    const token = uuidv4();
    const key = `auth_${token}`;
    const userId = user._id.toString();

    await redisClient.set(key, userId, 60 * 60 * 24);

    return response.json({ token });
  }

  static async getDisconnect(request, response) {
    await redisClient.del(request.authKey);

    return response.status(204).send();
  }
}
