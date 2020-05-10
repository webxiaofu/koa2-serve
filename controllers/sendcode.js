const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

class Code {
    async sendMailFn(ctx) {
        const transport = nodemailer.createTransport(smtpTransport({
            host: 'smtp.qq.com', // 服务
            port: 465, // smtp端口
            // secure: true,
            secureConnection: true, // 使用 SSL
            auth: {
                user: '1064230986@qq.com', // 发件地址
                pass: 'upaghedrcjbmbbjb' // 发件密码
            }
        }));

        const randomFns = () => {
            return ('000000' + Math.floor(Math.random() * 999999)).slice(-6); // 生成4位随机数
        }
        const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则


        let {
            email
        } = ctx.request.body
        
        let code = randomFns()
        if(!regEmail.test(email)){
            ctx.body={
                status:0,
                msg:'邮箱格式存在问题！',
                //code:code
            }
            return
        }
        let err=''
        await transport.sendMail({
            from: '1064230986@qq.com', // 发件邮箱
            to: email, // 收件列表
            subject: '欢迎注册', // 标题
            // text:"hello",
            html: '<p>你好！</p><p>感谢你的注册。</p><p>你的验证码是：<strong style="color: #ff4e2a;">' + code + '</strong></p><p>***该验证码5分钟内有效***</p>' // html 内容
        },  (error, data)=> {
            err = error
        })
        //console.log('发送的验证码：' + code)
        if (err) {
            ctx.body = {
                code: 0,
                msg: err
            }
        } else {
            ctx.body = {
                status: 1,
                msg: "邮件已发送,验证码十分钟内有效",
                code:code
            }
        }
        //console.log(ctx)
    }
}


module.exports = new Code();