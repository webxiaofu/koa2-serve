const mongoose = require('mongoose')
const {
  Schema,
  model
} = mongoose
const collectCommentSchema = new Schema({

  aid: {
    type: String
  },
  content: {
    type: String
  },
  create_timestamp: {
    type: String
  },
  parent_id: {
    type: String
  },
  reply_uid: {
    type: String
  },
  reply_user: {
    type: mongoose.Schema.Types.ObjectId,
        // 引用  ref:后的是Classify模型
    ref: "users" 
    
  },
  uid: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
        // 引用  ref:后的是Classify模型
    ref: "users" 
   
    }
  

})
module.exports = model('collectComment',collectCommentSchema)