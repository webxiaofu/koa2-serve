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
      number:{ type: String}
    },
    musics:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
      number:{ type: String}
    },
    pictures:{ 
      myself:{
        upload:{ type: Array},
        collect:{ type: Array},
      },
      number:{ type: String}
    },
    address:{ type: String},
    photo:{ type: String},
    description:{ type: String},
    homepage:{ type: String},
    fans:{
      fans_number:{ type:String},
      fans_id:{ type:Array}
    },
    focusOn:{
      focusOn_number:{ type:String},
      focusOn_id:{ type:Array}
    }
})

module.exports= model('users',usersSchema)