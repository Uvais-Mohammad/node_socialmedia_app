const express = require("express")
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

var postData=[
    {no:"1",title:"sample post",text:"this is a sample post with sample etxt as its body"},
    {no:"2",title:"abc title",text:"this is a sample post with title abc title and random body"},
    {no:"3",title:"hahaha",text:"this is a sample post"}

]

function validate(req,res,next){
    if(req.body.token){
        if(req.body.token=="uvsdf"){
            next()
            return
        }
        else
            res.json({status:"ok",value:"failed",error:"not authorised"})
    }else{
        res.json({status:"ok",value:"failed",error:"unauthorised user"})
    }
}

app.post("/connect",(req,res)=>{
    if(req.body.id){
        if(req.body.id=="C1010100"){
            req.json({status:"ok",value:"connect"})
        }else{
            res.json({status:"ok",value:"failed",error:"unauthorised app"})
        }
    }else{
        res.json({status:"error",value:"failed",error:"required parameters not found"})
    }
})//initial request from flutter app . send a post request from app with id = "C1010100"

app.post("/login",(req,res)=>{
    if(req.body.user && req,body.password){
        if(req.body.user=="uvais"&&req.body.password=="pass"){
            res.json({status:"ok",value:"success",token:"uvsdf"})
        }else{
            res.json({status:"ok",value:"failed",error:"wrong username or password"})
        }
    }else{
        res.json({status:"error",value:"failed",error:"required parameters not found"})
    }
})

app.post("/posts",validate,(req,res)=>{
    res.json(postData);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
