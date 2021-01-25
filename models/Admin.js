 var mongoose=require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    role: String,
    password:String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
