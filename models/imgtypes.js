const mongoose = require('mongoose');

const { Schema,model } = mongoose;

const imgtypesSchema = new Schema({
  /* _id: { type: Object}, */
  url: { type: String },
  type:{ type: String },
  des:{ type: String },
  title:{ type: String }
       
})
/* articlesSchema.set('autoIndex', false);  //推荐 */
module.exports= model('imgtypes',imgtypesSchema)