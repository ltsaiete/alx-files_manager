import { MongoClient } from 'mongodb';
import { DB_HOST, DB_PORT, DB_DATABASE } from './env';

class DBClient {
	constructor() {
		const url = `mongodb://${DB_HOST}:${DB_PORT}`;

		this.connected = false;

		MongoClient.connect(url, (err, client) => {
			if (!err) {
				console.log('Mongo client ready');
				this.db = client.db(DB_DATABASE);
				this.connected = true;
			} else {
				console.log('Error connecting to Mongo');
			}
		});
	}

	isAlive() {
		return this.connected;
	}

	async nbUsers() {
		const collection = this.db.collection('users');
		const count = await collection.countDocuments();
		return count;
	}

	async nbFiles() {
		const collection = this.db.collection('files');
		const count = await collection.countDocuments();
		return count;
	}

	waitConnection() {
		return new Promise((resolve, reject) => {
			let i = 0;
			const repeatFct = async () => {
				setTimeout(() => {
					i += 1;
					if (i >= 10) {
						reject();
					} else if (!this.isAlive()) {
						repeatFct();
					} else {
						resolve();
					}
				}, 1000);
			};
			repeatFct();
		});
	}

	async collection(name) {
		await this.waitConnection();
		return this.db.collection(name);
	}

	get client() {
		return this.db;
	}
}
const dbClient = new DBClient();
export default dbClient;
