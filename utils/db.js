import 'dotenv/config';
import { MongoClient } from 'mongodb';
class DBClient {
	#host = process.env.DB_HOST || 'localhost';
	#port = process.env.DB_PORT || 27017;
	#dbName = process.env.DB_DATABASE || 'files_manager';
	#connected = false;
	#db;
	constructor() {
		const url = `mongodb://${this.#host}:${this.#port}`;
		MongoClient.connect(url, (err, client) => {
			if (!err) {
				console.log('Mongodb client ready');
				this.#db = client.db(this.#dbName);
				this.#connected = true;
			}
		});
	}

	isAlive() {
		return this.#connected;
	}

	async nbUsers() {
		const collection = this.#db.collection('users');
		const count = await collection.countDocuments();
		return count;
	}

	async nbFiles() {
		const collection = this.#db.collection('files');
		const count = await collection.countDocuments();
		return count;
	}
}

const dbClient = new DBClient();

export default dbClient;
