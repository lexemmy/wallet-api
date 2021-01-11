const jwt = require('jsonwebtoken');

exports.hasAuth = function authenticateToken(req, res, next){
	const authHeader = req.headers['authorization'];
	if (authHeader == null){
		return res.sendStatus(401);
	}

	jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(401);
		}
		req.user = user;

		next()
	});
};