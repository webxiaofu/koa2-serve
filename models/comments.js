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
  children: [{
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
        nickname: {
          type: String
        },
        photo: {
          type: String
        },
        _id: {
          type: String
        }
      },
      uid: {
        type: String
      },
      user: {
        nickname: {
          type: String
        },
        photo: {
          type: String
        },
        _id: {
          type: String
        }
      },
    }
    /* { type: Array }, */
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
    nickname: {
      type: String
    },
    photo: {
      type: String
    },
    _id: {
      type: String
    }
  },
})

module.exports = model('comments', commentsSchema)