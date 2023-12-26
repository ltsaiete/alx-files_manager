import AppError from '../errors/AppError';
import userRepository from '../repositories/User';

class UsersController {
  async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) throw new AppError(400, 'Missing email');
    if (!password) throw new AppError(400, 'Missing password');

    const userExists = await userRepository.getUserByEmail(email);
    if (userExists) throw new AppError(400, 'Already exist');

    const userId = await userRepository.insertUser(email, password);

    return response.status(201).json({ id: userId, email });
  }

  async getMe(request, response) {
    const user = await userRepository.getUserById(request.userId);
    if (!user) throw new AppError(401, 'Unauthorized');

    delete user.password;

    return response.json({ id: user._id.toString(), email: user.email });
  }
}

export default new UsersController();
