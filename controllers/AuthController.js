import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import userRepository from '../repositories/User';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(request, response) {
    const [, auth] = request.headers.authorization.split(' ');
    const decoded = Buffer.from(auth, 'base64').toString('ascii');
    const [email, password] = decoded.split(':');

    const user = await userRepository.getUserByEmail(email);
    if (!user) return response.status(401).json();
    if (sha1(password) !== user.password) return response.status(401).json();

    const token = uuidv4();
    const key = `auth_${token}`;
    const userId = user._id.toString();

    await redisClient.set(key, userId, 60 * 60 * 24);

    return response.json({ token });
  }

  static async getDisconnect(request, response) {}
}
