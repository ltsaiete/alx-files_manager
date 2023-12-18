import chai from 'chai';
import sinon from 'sinon';

sinon.stub(console, 'log');

import redisClient from './utils/redis.js';

describe('redisClient test', () => {
	it('isAlive when redis not started', (done) => {
		let i = 0;
		const repeatFct = async () => {
			await setTimeout(() => {
				let cResult;
				try {
					cResult = redisClient.isAlive();
				} catch (error) {
					cResult = false;
				}
				chai.assert.isFalse(cResult);
				i += 1;
				if (i >= 5) {
					done();
				} else {
					repeatFct();
				}
			}, 1000);
		};
		repeatFct();
	}).timeout(10000);
});
