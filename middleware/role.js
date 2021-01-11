
exports.Admin = function(req, res, next) {
	if (req.user.role == "noob"){
		next();
	} else {
		res.status(400).json({
					status: 'error',
					message: 'unauthorized',
					});
	}
}
