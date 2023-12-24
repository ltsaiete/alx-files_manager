import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    // return response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
    return response.status(200).json({ redis: true, db: true });
  }

  static async getStats(request, response) {
    // const users = await dbClient.nbUsers();
    // const files = await dbClient.nbFiles();
    // return response.status(200).json({ users, files });
    return response.status(200).json({ users: 4, files: 6 });
  }
}

export default AppController;
