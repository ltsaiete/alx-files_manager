import userRepository from '../repositories/User';

class UsersController {
  async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    const userExists = await userRepository.getUserByEmail(email);
    if (userExists) return response.status(400).json({ error: 'Already exist' });

    const userId = await userRepository.insertUser(email, password);

    return response.status(201).json({ id: userId, email });
  }
}

export default new UsersController();
