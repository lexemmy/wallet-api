
exports.noob = function(req, res, next) {
	if (req.user.role == "noob"){
		next();
	} else {
		res.status(400).json({
					status: 'error',
					message: 'unauthorized',
					});
	}
}

exports.elite = function(req, res, next) {
	if (req.user.role == "elite"){
		next();
	} else {
		res.status(400).json({
					status: 'error',
					message: 'unauthorized',
					});
	}
}

exports.admin = function(req, res, next) {
	if (req.user.role == "admin"){
		next();
	} else {
		res.status(400).json({
					status: 'error',
					message: 'unauthorized',
					});
	}
}