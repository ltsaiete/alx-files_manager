import userRepository from '../repositories/User';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    const userExists = await userRepository.getUserByEmail(email);
    if (userExists) return response.status(400).json({ error: 'Already exist' });

    const userId = await userRepository.insertUser(email, password);

    return response.status(201).json({ id: userId, email });
  }

  static async getMe(request, response) {
    const user = await userRepository.getUserById(request.userId);
    if (!user) return response.status(401).json({ error: 'Unauthorized' });

    delete user.password;

    return response.json({ id: user._id.toString(), email: user.email });
  }
}

export default UsersController;
