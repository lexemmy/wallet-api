 var mongoose=require('mongoose');

const wallet = new mongoose.Schema({
    currency: String,
    amount: Number
});

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    role: String,
    wallet: [wallet],
    password:{
        type:String,
        required: true,
        minlength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
