const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.changeMainCurrency = (req, res) => {
	User.findOne({ email: req.body.email }).then(user =>{
		if (user == null) {
				return res.status(422).json({
				status: 'error',
				message: 'User does not exist',
			});
		}

		user.wallet.unshift({currency: req.body.currency});
		user.save()
        .then(user => {
        	return res.status(200).json({
				status: 'success',
				message: 'main currency updateted successfully',
			});
		}).catch(err => console.log(err))

	}).catch(err => console.log(err))
}

exports.changeUser = (req, res) => {
	User.findOne({ email: req.body.email }).then(user =>{
		if (user == null) {
				return res.status(422).json({
				status: 'error',
				message: 'User does not exist',
			});
		}

		user.role == req.body.role;
		user.save()
        .then(user => {
        	return res.status(200).json({
				status: 'success',
				message: 'user updateted successfully',
			});
		}).catch(err => console.log(err))

	}).catch(err => console.log(err))
}

exports.transactions = (req, res) => {
	Transaction.find().then(transaction => {
		return res.status(200).json({
		status: 'success',
		data: transaction
		});
	})

}

exports.approveDeposit = (req, res) => {
	Transaction.findOne({_id: req.body.id}).then(transaction => {
		if (transaction == null) {
				return res.status(422).json({
				status: 'error',
				message: 'transaction does not exist',
			});
		}
		transaction.status = 'approved'
		transaction.save()
		.then(transaction => {console.log(transaction)})
		.catch(err => console.log(err))
		User.findOne({ email: transaction.email }).then(user =>{
			user.wallet[0].amount += transaction.amount
			user.save()
			.then(transaction => {
				return res.status(200).json({
				status: 'success',
				message: 'deposit approved',
				});
			})
			.catch(err => console.log(err))
		}).catch(err => console.log(err))

	}).catch(err => console.log(err))
}

exports.approveWithdrawal = (req, res) => {
	Transaction.findOne({_id: req.body.id}).then(transaction => {
		if (transaction == null) {
				return res.status(422).json({
				status: 'error',
				message: 'transaction does not exist',
			});
		}
		transaction.status = 'approved'
		transaction.save()
		.then(transaction => {console.log(transaction)})
		.catch(err => console.log(err))
		User.findOne({ email: transaction.email }).then(user =>{
			user.wallet[0].amount -= transaction.amount
			user.save()
			.then(transaction => {
				return res.status(200).json({
				status: 'success',
				message: 'withdrawal approved',
			});
			})
			.catch(err => console.log(err))
		}).catch(err => console.log(err))

	}).catch(err => console.log(err))
}