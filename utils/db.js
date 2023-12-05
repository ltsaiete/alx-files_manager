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
				console.log('Mongo client ready');
				this.#db = client.db(this.#dbName);
				this.#connected = true;
			} else {
				console.log('Error connecting to Mongo');
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
		return this.#db.collection(name);
	}

	get client() {
		return this.#db;
	}
}

const dbClient = new DBClient();

export default dbClient;
