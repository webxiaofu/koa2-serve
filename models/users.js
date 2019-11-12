const mongoose = require('mongoose')

const { Schema,model } = mongoose;

const usersSchema = new Schema({
    username: { type: String},
    password: { type: String},
    email:{ type: String},
    role:{ type: String},
    articles:{ 
      myself:{
        write:{ type: Array},
        collect:{ type: Array},
      },
    },
    musics:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
    },
    pictures:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
    },
    address:{ type: String},
    photo:{ type: String},
    description:{ type: String},
    homepage:{ type: String}
})

module.exports= model('users',usersSchema)