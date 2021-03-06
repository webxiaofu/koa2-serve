const mongoose = require('mongoose');

const { Schema,model } = mongoose;

const articlesSchema = new Schema({
  /* _id: { type: Object}, */
  title: { type: String},
  create_data: { type: String},
  comment_count: { type: Number},
  read_count: { type: Number},
  collect_count: { type: Number},
  tag: { type: String},
  column: { type: String},
  content: { type: String},
  author:{
    /* author_name: { type: String},
    author_id: { type: String},
    photo: { type: String}, */
    type: mongoose.Schema.Types.ObjectId,
    ref : 'users'
  },
  picture: { type: String},
       
})
/* articlesSchema.set('autoIndex', false);  //推荐 */
module.exports= model('articles',articlesSchema)