function getUser(req: any) {
	let user = req.header("X-user");
	user = JSON.parse(user);
	return user;
}

export { getUser };
