import userRepository from '../repositories/User';

class UserController {
	postNew(request, response) {
		const { email, password } = request.body;

		if (!email) return response.status(400).json({ error: 'Missing email' });
		if (!password) return response.status(400).json({ error: 'Missing password' });

		return response.json({ ok: true });
	}
}

export default new UserController();
