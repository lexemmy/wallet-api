var mongoose=require('mongoose');

const transactionSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        maxlength: 100
    },
    amount:{
        type: Number,
        required: true
    },
    status: String,
    type: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
