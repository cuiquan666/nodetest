const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const Users = require('./schema/users');
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.use('/login',(req,res)=>{
   let {usename,password} = req.body
   Users.findOne({
       usename,
       password
   }).then(user=>{
      if(user){
          res.send({
              errno:0
          })
      }else{
        res.send({
            errno:1
        })
      }
   })
 
});


app.use('/register',(req,res)=>{
    let {usename,password} = req.body
    
    Users.findOne({
        usename
    }).then(user=>{
        if(user){
            res.send({
                errno:1
            })
            return
        }
        res.send({
            errno:0
        })

        new Users({
            usename,
            password,
            age:~~(Math.random()*20+20)
        }).save()
    })
  
 });

app.get('/userlist',(req,res)=>{
    Users.find().then(users=>{
        res.send(users)
    })
})

mongoose.connect('mongodb://localhost:27018/vuex',{ useNewUrlParser : true},(err)=>{
  if(err){
      console.log('数据库连接失败')
      return
  }
  app.listen(3000,()=>{
    console.log('3000端口监听ok')
  })
  console.log('数据库连接成功')
   
})