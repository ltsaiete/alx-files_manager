import redisClient from '../utils/redis';

export async function authMiddleware(request, response, next) {
  const token = request.headers['x-token'];
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);

  if (!userId) throw new AppError(401, 'Unauthorized');

  request.userId = userId;
  request.authKey = key;
  next();
}
