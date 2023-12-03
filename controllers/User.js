class UserController {
	postNew(request, response) {
		const { email, password } = request.body;

		return response.json({ ok: true });
	}
}

export default new UserController();
