const mongoose = require('mongoose');
const path = require('path');
const Pictures = require('../models/pictures')
const ImgTypes = require('../models/imgtypes')

class PicturesInterface {
  //上传图片获取url
  UploadPicture(ctx) {
    const file = ctx.request.files.file

    const basename = path.basename(file.path)
    //console.log(basename)
    ctx.body = {
      url: `${ctx.origin}/imgsupload/${basename}`,
      status: 1,
      msg: '上传成功！'
    }

    /* ctx.body = {
      status: 0,
      msg: '上传失败！'
    } */
  }
  //保存图片url
  async SavePicture(ctx) {
    console.log(ctx.request.body,'test')
    const pictures = await new Pictures(ctx.request.body).save()
    ctx.body = {
      status: 1,
      msg: '上传成功！'
    }
  }
  //新增图片类别
  async addImgType(ctx){
    //console.log(ctx.request.body)
    const imgTypes = await new ImgTypes(ctx.request.body).save()
    ctx.body = {
      status: 1,
      msg: '新增成功！'
    }
  }
  //获取某类别的图片
  async getPicturesByType(ctx) {
    let {
      type,
      page,
      pagesize
    } = ctx.query
    let skip = (parseInt(page) - 1) * parseInt(pagesize)
    let count
    await Pictures.find({
      type: type
    }).count(function (err, result) {
      if (err) {
        //count = err
      } else {
        count = result
      }
    })
    const PicturesList = await Pictures.find({
      type: type
    }).skip(skip).limit(parseInt(pagesize))
    ctx.body = {
      status: 1,
      data: PicturesList,
      count: count
    }
  }
  //获取图片类别
  async getImgTypes(ctx) {
    let {
      type,
    } = ctx.query
    const imgTypesList = await ImgTypes.find({
      
    })
    ctx.body = {
      status: 1,
      data: imgTypesList
    }
  }

}
module.exports = new PicturesInterface();