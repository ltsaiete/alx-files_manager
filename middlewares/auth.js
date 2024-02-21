import redisClient from '../utils/redis';

export async function getUserId(request) {
  const token = request.headers['x-token'];
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);

  return userId;
}

export async function authMiddleware(request, response, next) {
  const token = request.headers['x-token'];
  const key = `auth_${token}`;
  const userId = await getUserId(request);

  if (!userId) return response.status(401).json({ error: 'Unauthorized' });

  request.userId = userId;
  request.authKey = key;
  next();
}
