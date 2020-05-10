const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const Comment = require('../models/comments')
const Article = require('../models/articles')
const {
  secret
} = require('../config');
const mongoose = require('mongoose')
/* var ObjectID = require('mongodb').ObjectID; */
class UsersInterface {
  //注册
  async register(ctx) {
    ctx.verifyParams({
      nickname: {
        type: 'string',
        required: true
      },
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
      email: {
        type:'string',
        required: true
      }
    });
    /* 检验用户名是否重复 */
    const {
      username
    } = ctx.request.body;
    const repeatedUser = await User.findOne({
      username
    });
    if (repeatedUser) {
      ctx.body = {
        status:0,
        msg:'用户名已经存在！'
      }
    }else{
      const user = await new User(ctx.request.body).save();
      ctx.body = {
        user: user,
        status: 1,
      }
    }
    
  }
  //查看所有用户或者某一个具体用户的信息
  async findAllUsers(ctx) {
    const { id } = ctx.query;
    let conditions
    if(id == undefined){
      conditions = {}
      //console.log('ok')
    }else {
      const _id = mongoose.Types.ObjectId(id);
      conditions = {_id:_id}
    }
    //console.log(id)
    //console.log(conditions)
    
    const users = await User.find(conditions);
    ctx.body = {
      status: 1,
      users: users
    }
  }
  //带分页查询用户表
  async getUsersByPage(ctx){
    let {
      
      page,
      pagesize
    } = ctx.query
    let skip = (parseInt(page) - 1) * parseInt(pagesize)
    let count
    await User.find({
    }).count(function (err, result) {
      if (err) {
        //count = err
      } else {
        count = result
      }
    })
    const users = await User.find().skip(skip).limit(parseInt(pagesize))
    ctx.body = {
      status:1,
      count:count,
      user:users
    }
  }
  //登录
  async login(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      /* ctx.throw(401, '用户名或密码不正确'); */
      ctx.body = {
        status:0,
        msg:'用户名或者密码不正确！'
      }
    }else{
      const {
        _id,
        username
      } = user;
      const token = jsonwebtoken.sign({
        _id,
        username
      }, secret, {
        expiresIn: '1d'
      });
      ctx.body = {
        token:token,
        status:1,
        user:user
      };
    }
    
  }
  async deleteArticle(ctx){
    let {aid,uid} = ctx.query
    const newArticle = await Article.remove({'_id':aid})
    const newComment = await Comment.deleteMany({'aid':aid})
    const newUser = await User.findByIdAndUpdate(uid,{
      $pull:{
        'articles.myself.write':aid
      },
      $inc:{
        'articles.number':-1
      }
    },{
      new:true
    })
    console.log(newUser)
    ctx.body = {
      status:1,
      msg:'删除成功！'
    }
  }
  //关注他人接口 status 0 关注 1 取消关注
  async FocusOnOthers(ctx){
    let {fid,uid,status}=ctx.request.body
    if(status == 0){
      const newUser1 = await User.findByIdAndUpdate(uid,{
        $push:{
          'focusOn.focusOn_id':fid
        },
        $inc:{
          'focusOn.focusOn_number':1
        }
      },{
        new:true
      })
      
      const newUser2 = await User.findByIdAndUpdate(fid,{
        $push:{
          'fans.fans_id':uid
        },
        $inc:{
          'fans.fans_number':1
        }
      },{
        new:true
      })
      
      ctx.body = {
        status:1,
        msg:'关注成功！'
      }
    }else if(status == 1){
      const newUser1 = await User.findByIdAndUpdate(uid,{
        $pull:{
          'focusOn.focusOn_id':fid
        },
        $inc:{
          'focusOn.focusOn_number':-1
        }
      },{
        new:true
      })
      const newUser2 = await User.findByIdAndUpdate(fid,{
        $pull:{
          'fans.fans_id':uid
        },
        $inc:{
          'fans.fans_number':-1
        }
      },{
        new:true
      })
      ctx.body = {
        status:1,
        msg:'取消关注成功！'
      }
    }
  }
  //修改用户信息 
  async updateUserInfo(ctx){
    let {nickname,
    role,
    address,
    description,
    homepage,
    photo,
    _id} = ctx.request.body
    const newUserInfo = await User.findByIdAndUpdate(_id,{
      $set:{
        'nickname':nickname,
        'role':role,
        'description':description,
        'homepage':homepage,
        'address':address,
        'photo':photo
      }
    },{
      new:true
    })
    console.log(newUserInfo)
    ctx.body = {
      status:1,
      msg:'修改成功！',
      data:newUserInfo
    }
  }
  //修改用户密码
  async updatePassword(ctx){
    let {old_password,new_password,repeat_new_password,uid} = ctx.request.body
    const userInfo = await User.findById(uid)
    console.log(userInfo)
    if(userInfo.password == old_password){
      const newUserInfo = await User.findByIdAndUpdate(uid,{
        $set:{
          'password':new_password
        }
      },{
        new:true
      })
      ctx.body = {
        status:1,
        msg:'修改成功！'
      }
    }else{
      ctx.body = {
        status:0,
        msg:"原密码错误！"
      }
    }
  }
  //重置密码
  async resetPwd(ctx){
    let {username, password, email} = ctx.request.body
    const newUserInfo = await User.findOneAndUpdate({username:username,email:email},{
      $set:{
        'password':password
      }
    },{
      new:true
    })
    console.log(newUserInfo)
    if(newUserInfo){
      ctx.body = {
        status:1,
        msg:'重置成功！'
      }
    }else{
      ctx.body = {
        status:0,
        msg:'账号与邮箱不匹配！'
      }
    }
  }
  //修改用户信息表(服务端)
  async updateUser(ctx){
    console.log(ctx.request.body)
    const {_id, username, role, nickname, password, email, address, homepage}= ctx.request.body
    const newUserInfo = await User.findByIdAndUpdate(_id,{
      $set:{
        'username':username,
        'nickname':nickname,
        'role':role,
        'homepage':homepage,
        'address':address,
        'email':email,
        'password':password
      }
    },{
      new:true
    })
    console.log(newUserInfo)
    ctx.body = {
      status:1,
      msg:'修改成功！',
      data:newUserInfo
    }


  }
}

module.exports = new UsersInterface();