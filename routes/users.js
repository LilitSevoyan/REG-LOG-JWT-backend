
const express = require('express')
const router = express.Router()
const User = require("../models/Register")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

let refreshTokens = [];


router.get("/userall", async (req,res)=>{
    
    try{
        let user = await User.find({})
        res.json({user})
        
    }catch(error){
        res.status(500).json({err:error})
    }
})

router.get("/",authenticateToken, async (req,res)=>{
    
    try{
        console.log(req.user,"user");
        let user = await User.findOne({email: req.user.email})
        res.json({user})
        
    }catch(error){
        res.status(500).json({err:error})
    }
})
router.post("/register",async (req,res)=>{
   try{
    console.log(req.body);
       const {username,surname,email,password,confpassword} = req.body
       //const HashPassword = await bcrypt.hash(password,10)
       let newUser = await new User({
           username,
           surname,
           email,
           password,
           confpassword

       })
      // console.log(req.headers)
        await newUser.save()
           res.status(201).json({newUser})
        } 
   catch(error){
       console.log(error)
        res.status(500).json({err:error})
   }  
})


router.post("/login",async (req,res)=>{
    try{
        const email = await User.findOne({email:req.body.email})
        console.log(email);
        const username = req.body.email
        const user = {email:username}
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        
        refreshTokens.push(refreshToken)
        res.json({accessToken:accessToken,refreshToken:refreshToken})
        //}
    }
    catch(error){
        res.status(500).json({err:error})
    }
})
router.get("/user1/:email",async(req,res)=>{
    console.log(req.params)
    try{
        const user = await User.findOne({email:req.params.email})
        res.json({user})
    }
    catch(error){
        res.status(500).json({err:error})
    }
})




function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
	console.log({ token: process.env.ACCESS_TOKEN_SECRET, token2: authHeader})
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
     
    if (err) return res.sendStatus(403)
    console.log(req.body.email);
    req.user = user
    next()
  })

}

function generateAccessToken(user) {
    const myToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '30s' })
    return myToken
}

module.exports = router