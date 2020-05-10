const mongoose = require('mongoose');
const path = require('path');
class UploadInterface {
    UploadArticlePicture(ctx) {
    const file = ctx.request.files.file
    
    const basename = path.basename(file.path)
    //console.log(basename)
    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`,
      status: 1,
      msg: '上传成功！'
    }

    /* ctx.body = {
      status: 0,
      msg: '上传失败！'
    } */
  }
  
}
module.exports = new UploadInterface();