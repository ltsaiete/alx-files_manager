import dbClient from '../utils/db';

class UserRepository {
	#collection;
	constructor() {
		dbClient.collection('users').then((collection) => {
			this.#collection = collection;
		});
		// console.log(dbClient);
	}
}

export default new UserRepository();
