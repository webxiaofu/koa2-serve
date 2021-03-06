/* var ObjectID = require('mongodb').ObjectID; */
const Comments = require('../models/comments')
const User = require('../models/users')
const Articles = require('../models/articles')
const ColletcComment = require('../models/collectcomment')
const mongoose = require('mongoose');

class CommentsInterface {
  //新增评论
  async addComments(ctx) {
    const {
      uid,
      aid,
      content,
      parent_id,
      reply_uid
    } = ctx.request.body
    const timestamp = String((new Date()).valueOf());
    const userInfo = await User.find({
      _id: uid
    }) //回复的人的id
    
    //console.log(userInfo)
    if (parent_id == '' && reply_uid == '') {
      let params = {
        aid: aid, //文章id
        children: [],
        content: content,
        create_timestamp: timestamp,
        parent_id: parent_id,
        //reply_id: "0",
        reply_uid: reply_uid,
        //status: 4,
        uid: uid, //评论者id
        user: uid

      }
      const newComment = await new Comments(params).save()
      //console.log(newComment)
      const articleInfo = await Articles.findByIdAndUpdate(aid,{
        $inc:{
          'comment_count':1
        }
      },{
        new:true,

      })
      //console.log(articleInfo)
      const data = await Comments.find({_id:newComment._id}).populate('user', '_id nickname photo')
      //console.log(newComment)
      //console.log(data)
      ctx.body = {
        data: data[0],
        status: 1
      }
    } else {
      const replyUserInfo = await User.find({
        _id: reply_uid
      }) //被回复的人的id
      const id = String(mongoose.Types.ObjectId())
      console.log(id,'daozhelile')
      let params = {
        aid: aid,
        content: content,
        
        create_timestamp:  timestamp,
        _id:id,
        parent_id: parent_id,
        //reply_id: "224",
        reply_uid: reply_uid,
        reply_user: reply_uid,
        //status: 4,
        uid: uid,
        user: uid
      }
      const newColletcComment = await new ColletcComment(params).save()
      console.log(newColletcComment)
      const newComment = await Comments.findByIdAndUpdate(parent_id,{
        $push:{
          'children':id
        }
      },{
        new:true,

      })
      //console.log(newComment)
      const data = await ColletcComment.find({_id:id}).populate('user reply_user', '_id nickname photo')
      ctx.body={
        data:data[0],
        status:1
      }
    }

  }
  //根据id获取所有评论
  async getCommentsById(ctx){
    let {id,page,pagesize} = ctx.query
    let skip = (parseInt(page)-1)*parseInt(pagesize)
    let count 
    await Comments.find({aid:id}).count(function(err,result){
      if(err) {
        //count = err
      }else{
        count = result
      }
    })
    const CommentsInfo = await Comments.find({aid:id})
    .populate('user', '_id nickname photo')
    .populate({
      path: 'children',
      //select: '_id name phone merchant',
      //model: 'collectComment',
      populate: {
        path: 'reply_user user',
        select: '_id nickname photo',
        model: 'users'
      }
    }).sort({'create_timestamp':-1}).skip(skip).limit(parseInt(pagesize))
    //console.log(CommentsInfo)
    ctx.body= {
      status:1,
      data:CommentsInfo,
      count:count
    }
  }
  //删除评论/* 传过来一个parent_id,如果为空，说明该评论是一级评论，否则就是二级评论 */
  async deleteComments(ctx) {
    const { id,parent_id } = ctx.request.body
    if(parent_id == ''){
      const newColletcComment = await ColletcComment.remove({parent_id:id})
      const commentInfo = await Comments.find({_id:id})
      console.log(commentInfo)
      
      const aid = commentInfo[0].aid
      //const aid = mongoose.Types.ObjectId(commentInfo.aid);
      //console.log(aid)
      const articleInfo = await Articles.findByIdAndUpdate(aid,{
        $inc:{
          'comment_count':-1
        }
      },{
        new:true,
      })
      //console.log('articleInfo:',articleInfo)
      const newComment = await Comments.findByIdAndRemove(id)
      ctx.body= {
        status:1,
        msg:'删除成功！'
      }
    }else{
      const newComment = await Comments.findByIdAndUpdate(parent_id,{
        $pull:{
          'children':id
        }
      },{
        new:true,
      })
      console.log(newComment)
      const newColletcComment = await ColletcComment.remove({_id:id})
      ctx.body= {
        status:1,
        msg:'删除成功！'
      }
    }
    //console.log(id,parent_id)
  }
}
module.exports = new CommentsInterface();