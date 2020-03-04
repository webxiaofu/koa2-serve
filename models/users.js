const mongoose = require('mongoose')

const { Schema,model } = mongoose;

const usersSchema = new Schema({
    nickname: { type: String},
    username: { type: String},
    password: { type: String},
    email:{ type: String},
    role:{ type: String},
    articles:{ 
      myself:{
        write:{ type: Array},
        collect:{ type: Array},
      },
      number:{ type: Number}
    },
    musics:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
      number:{ type: Number}
    },
    pictures:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
      number:{ type: Number}
    },
    address:{ type: String},
    photo:{ type: String},
    description:{ type: String},
    homepage:{ type: String},
    fans:{
      fans_number:{ type:Number},
      fans_id:{ type:Array}
    },
    focusOn:{
      focusOn_number:{ type:Number},
      focusOn_id:{ type:Array}
    }
})

module.exports= model('users',usersSchema)