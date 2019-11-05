const mongoose = require('mongoose')

const { Schema,model } = mongoose;

const usersSchema = new Schema({
    
})

module.exports= model('users',usersSchema)