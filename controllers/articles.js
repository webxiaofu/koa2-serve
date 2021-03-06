/* var ObjectID = require('mongodb').ObjectID; */
const Articles = require('../models/articles')
const Author = require('../models/users')
const User = require('../models/users')
const mongoose = require('mongoose');

class ArticlesInterface {
  //获取文章
  async getArticles(ctx) {
    const {
      page,
      sortId,
      pagesize
    } = ctx.query;
    const thePage = parseInt(page);
    const theSortId = parseInt(sortId);
    const thePagesize = parseInt(pagesize);

    let skip = (thePage - 1) * thePagesize;
    //获取总数
    let UserCount
    Articles.find({}).count(function (err, result) {
      if (err) {
        UserCount = err;
      } else {
        UserCount = result;
      }
    }); /* try catch捕获错误情况？？？ */
    if (theSortId == 0) {
      const articles = await Articles.find({}).populate('author', 'nickname photo _id').sort({
        'create_data': -1
      }).skip(skip).limit(thePagesize);
      ctx.body = {
        status: 1,
        articles: articles,
        count: UserCount
      }
    } else if (theSortId == 1) {
      const articles = await Articles.find({}).populate('author', 'nickname photo _id').sort({
        'read_count': -1
      }).skip(skip).limit(thePagesize);
      ctx.body = {
        status: 1,
        articles: articles,
        count: UserCount
      }
    } else {
      const articles = await Articles.find({}).populate('author', 'nickname photo _id').sort({
        'collect_count': -1
      }).skip(skip).limit(thePagesize);
      ctx.body = {
        status: 1,
        articles: articles,
        count: UserCount
      }
    }
  }
  //提交文章   
  /* 
     1、文章相关数据需要存到articles表里
     2、需要将文章id添加到user表里
   */
  async createArticle(ctx) {

    try {
      const NewArticles = await new Articles(ctx.request.body).save()
      const {
        _id
      } = NewArticles
      const {
        author
      } = NewArticles
      /* console.log(NewArticles) */
      //console.log(updateData)
      const newUser = await User.findByIdAndUpdate(author, {
        $push: {
          'articles.myself.write': _id
        },
        $inc: {
          'articles.number': 1
        }
      }, {
        new: true
      })
      console.log(newUser)
      ctx.body = {
        articlesInfo: NewArticles,
        status: 1,
        msg: '上传成功！'
      }
    } catch {
      ctx.body = {
        status: 0,
        msg: '上传失败！'
      }
    }


    /* 11.20TODO */
    /* 
    1、上传文章接口
    2、文章展示界面
    3、文章编写界面完善
    */
  }
  async getArticleInfoById(ctx) {
    let {
      id
    } = ctx.query
    const articlesInfo = await Articles.findOne({
      _id: id
    }).populate('author', 'nickname photo _id')
    ctx.body = {
      status: 1,
      articleInfo: articlesInfo
    }
  }
  async addReadCount(ctx) {
    let {
      id
    } = ctx.query
    const aa = await Articles.findById(id)
    console.log(aa)
    const newArticle = await Articles.findByIdAndUpdate(id, {
      $inc: {
        'read_count': 1
      }
    }, {
      new: true
    })
    console.log(newArticle)
    ctx.body = {
      status: 1,
      msg: '操作成功！'
    }
  }
  //获取用户的所有 文章  （分页）
  async findArticleByUid(ctx) {
    let {
      uid,
      page,
      pagesize
    } = ctx.query
    let skip = (parseInt(page) - 1) * parseInt(pagesize)
    let count
    await Articles.find({
      'author': uid
    }).count(function (err, result) {
      if (err) {
        //count = err
      } else {
        count = result
      }
    })
    const articles = await Articles.find({
      'author': uid
    }).populate('author', 'nickname photo _id').sort({
      'create_data': -1
    }).skip(skip).limit(parseInt(pagesize))
    ctx.body = {
      status: 1,
      count: count,
      articles: articles
    }
  }
  //优质文章推荐
  async recommendArticle(ctx) {
    const articles = await Articles.find({}).populate('author', 'nickname photo _id')
    //console.log(articles)
    ctx.body = {
      status: 1,
      data: articles,

    }
  }
  //编辑文章
  async updateArticle(ctx){
    const { _id, title, content , } = ctx.request.body
    const newArticle = await Articles.findByIdAndUpdate(_id,{
      $set:{
        'title':title,
        'content':content
      }
    },{
      new:true
    })
    console.log(newArticle)
    ctx.body = {
      status :1,
      msg:'修改成功！',
      data:newArticle
    }
  }
}
module.exports = new ArticlesInterface();