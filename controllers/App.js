import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
	getStatus(request, response) {
		return response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
	}

	async getStats(request, response) {
		const users = await dbClient.nbUsers();
		const files = await dbClient.nbFiles();
		return response.status(200).json({ users, files });
	}
}

export default new AppController();
