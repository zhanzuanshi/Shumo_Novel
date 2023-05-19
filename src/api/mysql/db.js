const mysql=require('mysql')

const config=require('./MysqlConfig').db //获取数据库相关配置

module.exports=mysql.createConnection(config) //创建连接实例