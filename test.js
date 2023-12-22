import redisClient from './utils/redis';

console.log('is alive');
console.log(redisClient.isAlive());
// console.log(redisClient.isAlive());
// async function waitConnection() {
// 	return new Promise((resolve, reject) => {
// 		let i = 0;
// 		const repeatFct = async () => {
// 			setTimeout(() => {
// 				i += 1;
// 				if (i >= 10) {
// 					reject();
// 				} else if (!redisClient.isAlive()) {
// 					repeatFct();
// 				} else {
// 					resolve();
// 				}
// 			}, 1000);
// 		};
// 		repeatFct();
// 	});
// }

// waitConnection().then(() => {
// 	console.log(redisClient.isAlive());
// });
