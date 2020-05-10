const mongoose = require('mongoose');

const { Schema,model } = mongoose;

const picturesSchema = new Schema({
  /* _id: { type: Object}, */
  src: { type: String },
  type:{ type: String },
  
       
})
/* articlesSchema.set('autoIndex', false);  //推荐 */
module.exports= model('pictures',picturesSchema)