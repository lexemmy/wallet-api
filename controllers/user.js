const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');



exports.signup = (req, res) => {

	const data = req.body;

	const schema = joi.object({
		fullname : joi.string().required(),
		role: joi.string().required(),
		currency: joi.string().required(),
		email : joi.string().email().required(),
		password : joi.string().min(4).required().label('password'),
		password2 : joi.any().equal(joi.ref('password')).required().label('password').messages({'any.only': '{{#label}} does not match'})
	});

	const {error, value} = schema.validate(data)

	if (error) {

		return res.status(422).json({
			status: 'error',
			message: 'invalid request data',
			data: error.details[0].message
		});
	}
		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				res.status(422).json({
				status: 'error',
				message: 'User already exist',
		});
			}
		})
		const newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          role: req.body.role,
          wallet: [{currency: req.body.currency, amount: 0}],
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
        	bcrypt.hash(newUser.password, salt, (err, hash) => {
		        if (err) throw err;
		        newUser.password = hash;

		        newUser.save()
		        .then(user => {
		        	return res.status(200).json({
						status: 'success',
						message: 'User created successfully',
						data: user
					});
					        })
		        .catch(err => console.log(err))
        	});
       	});
}

exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).then(user =>{

			if (user == null) {
				res.status(422).json({
				status: 'error',
				message: 'User does not exist',
			});
		} else {

			bcrypt.compare(req.body.password, user.password, (err, same) => {
				if (same) {
					const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
					res.status(200).json({
					status: 'success',
					data: user,
					accessToken: accessToken
					});
				} else {
					res.status(422).json({
					status: 'error',
					message: 'invalid passwordd',
					});
				}
			})
		}
	}).catch(err => console.log(err))
};

exports.fundwallet = (req, res) => {
	User.findOne({ email: req.body.email }).then(user =>{

			if (user == null) {
				return res.status(422).json({
				status: 'error',
				message: 'User does not exist',
				});
			}

			if (user.role == "noob") {
				if (user.wallet[0].currency == req.body.currency) {
					console.log("here")
					const newTransaction = new Transaction({
							email: user.email,
							amount: req.body.amount,
							status: 'pending',
							type: 'deposit'
						});
					newTransaction.save()
			        .then(transaction => {
			        	return res.status(200).json({
							status: 'success',
							message: 'deposit request sent, waiting approval',
						});
					})
			        .catch(err => console.log(err))
					
				} else {
					//convert to main and send request
				}
			} else if (user.role == "elite") {

				if (user.wallet.some(wallet => wallet.currency === req.body.currency)) {
					wallet = user.wallet.find(wallet => wallet.currency === req.body.currency);
					wallet.amount += req.body.amount
					user.save()
			        .then(user => {
			        	return res.status(200).json({
							status: 'success',
							message: 'wallet funded successfully',
						});
					})
			        .catch(err => console.log(err))

				} else {
					user.wallet.push({currency: req.body.currency, amount: req.body.amount});
					user.save()
			        .then(user => {
			        	return res.status(200).json({
							status: 'success',
							message: 'wallet created and funded successfully',
						});
								})
			        .catch(err => console.log(err))
				}
			}
	
	}).catch(err => console.log(err))
}

exports.withdraw = (res, req) => {

	User.findOne({ email: req.body.email }).then(user =>{
		if (user == null) {
				return res.status(422).json({
				status: 'error',
				message: 'User does not exist',
			});
		}

		if (user.role == "noob") {
				if (user.wallet[0].currency == req.body.currency) {
						const newTransaction = new Transaction({
							email: user.email,
							amount: req.body.amount,
							status: 'pending',
							type: 'deposit'
						})
						newTransaction.save()
				        .then(transaction => {
				        	return res.status(200).json({
								status: 'success',
								message: 'withdrawal request sent, waiting approval',
							});
						})
				        .catch(err => console.log(err))
				} else {
					//convert to main and send request
				}
			} else if (user.role == "elite") {

				if (user.wallet.some(wallet => wallet.currency === req.body.currency)) {
					wallet = user.wallet.find(wallet => wallet.currency === req.body.currency);
					wallet.amount -= req.body.amount
					user.save()
			        .then(user => {
			        	return res.status(200).json({
							status: 'success',
							message: 'withdrawal successfully',
						});
					})
			        .catch(err => console.log(err))
					
				} else {
					//convert to main currency and withdraw
					user.save()
			        .then(user => {
			        	return res.status(200).json({
							status: 'success',
							message: 'withdrawal successfully',
						});
					})
			        .catch(err => console.log(err))
				}
			}

	}).catch(err => console.log(err))

}

exports.users = (req, res) => {
	User.find().then(user => {
		res.status(200).json({
		status: 'success',
		data: user
		});
	})

}
