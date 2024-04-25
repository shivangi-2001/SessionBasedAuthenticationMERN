const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

const AccountSchema = Schema({
    full_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

AccountSchema.pre('save', async function(next){
    const account = this;
    if (!account.isModified('password')) return next();
    account.password = await bcrypt.hash(account.password, 10); 
    next();
})



const accounts = model('Accounts', AccountSchema)
module.exports = accounts;
