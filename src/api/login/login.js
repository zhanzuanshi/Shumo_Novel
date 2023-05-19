// noinspection SqlDialectInspection
const crypto=require('crypto')  //加密算法

const bodyParser=require('body-parser')

const express=require('express')  //引入express

const connection=require('../mysql/db') //获取连接实例

const {port}=require('../mysql/MysqlConfig') //获取启动参数

const app=express()    //创建express实例

const jsonParser = bodyParser.json();
// 创建MD5加密方法
function cryptpwd(password){
    var MD5=crypto.createHash('md5');
    return MD5.update(password).digest('hex')
}
// 注册接口
app.post('/regeister',jsonParser,(req,res)=>{
    const params=req.body
    const sql_sel='select * from users where user_name=? '
    var time= Date.now()
    const sql_add='insert into users(user_id,user_name,password,email,role) values (?,?,?,?,?)'
    connection.query(sql_sel,params.user_name,(err,data)=>{
        if (err) {
            console.log(err)
        }else if (data.length!==0){
            res.send('-1')
        }else {
            connection.query(sql_add,[time,params.user_name,cryptpwd(params.password),params.email,params.role? params.role : 'user'],(err,data)=>{
                if (err) {
                    console.log(err);
                    res.send('注册失败')
                }else {
                    res.send('0')
                    return
                }
            })
        }
    })


})
// 登录接口
app.post('/login',jsonParser,(req,res)=>{
    const params=req.body
    const sel_sql='select * from users where user_name=?'
    connection.query(sel_sql,params.user_name,(err,data)=>{
        console.log(data);
        if(err){
          console.log(err);
        }
        else if(data.length==0){
            res.send('-1')
        }
       else if(cryptpwd(params.password)===data[0].password){
            res.send(data)
        }
        else {
            res.send('1')
            return
        }
    })
})
// 获取用户信息
app.get('/users',jsonParser,(req,res)=>{
    const sel_sql='select * from users'
    connection.query(sel_sql,(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})
// 删除用户
app.post('/deleteUser',jsonParser,(req,res)=>{
    const params=req.body
    const sel_sql='delete from users where user_name=?'
    connection.query(sel_sql,params.user_name,(err,data)=>{
            if(err){
                console.log(err);
                res.send('-1')
            }else{
                res.send('0')
            }
    })
})
// 获取用户数量
app.get('/getTotalUser',jsonParser,(req,res)=>{
    const sel_sql='select count(*) as totaluser from users'
    connection.query(sel_sql,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(data)
        }
    })
})
app.listen(port,() => {
    console.log(`express server listen at http://localhost:${port}`)
})