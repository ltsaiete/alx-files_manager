import redisClient from '../utils/redis';

export async function authMiddleware(request, response, next) {
  const token = request.headers['x-token'];
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);

  if (!userId) return response.status(401).json({ error: 'Unauthorized' });

  request.userId = userId;
  request.authKey = key;
  next();
}
