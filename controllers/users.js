const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const {
  secret
} = require('../config');
const mongoose = require('mongoose')
/* var ObjectID = require('mongodb').ObjectID; */
class UsersInterface {
  //注册
  async register(ctx) {
    ctx.verifyParams({
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
  //查看所有用户
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
}

module.exports = new UsersInterface();