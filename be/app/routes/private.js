const privateRoutes = {
  	'POST /add': 'UserController.register_user',
	'POST /login': 'UserController.login_user',

	'GET /users': 'UserController.list_user',
	'POST /calling/group': 'CallingController.group_calling',
	'POST /ethical': 'CallingController.ethical',
	'POST /call/length': 'CallingController.call_by_length',
};

module.exports = privateRoutes;
