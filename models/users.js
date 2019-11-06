const mongoose = require('mongoose')

const { Schema,model } = mongoose;

const usersSchema = new Schema({
    username: { type: String},
    password: { type: String}
})

module.exports= model('users',usersSchema)