const mongoose = require('mongoose')

const {
  Schema,
  model
} = mongoose;

const commentsSchema = new Schema({
  aid: {
    type: String
  },
  content: {
    type: String
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'collectComment'
    }
  ],
  create_timestamp: {
    type: String
  },
  parent_id: {
    type: String
  },
  reply_uid: {
    type: String
  },

  uid: {
    type: String
  },
  user: {
  
    type: mongoose.Schema.Types.ObjectId,
        // 引用  ref:后的是Classify模型
    ref: "users" 
  },
})

module.exports = model('comments', commentsSchema)