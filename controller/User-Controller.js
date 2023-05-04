const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/User_model')



const signUp = (req, res) => {
    bcrypt.hash(req.body.password,10, async (err, hashedpass) => {
        if (err) {
            res.json({ message: err })
        }

        let checkemail =await User.findOne({ email: req.body.email })
       
        if (checkemail) {
            res.json({ message: 'Email already exist' })
        }
        else {
            signUpData = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedpass
            })
            await signUpData.save().then((login)=>{
                res.json({
                    status:1,
                    message:'SignUp successfull'
                })
            }).catch((error)=>{
                res.json({message:`an error${error}`})
            })
        }
    })
}

const signIn=async(req,res)=>{
await User.findOne({email:req.body.email}).then((login)=>{
    if(login){
    
        bcrypt.compare(req.body.password,login.password,(err,result)=>{
            if(err){
                res.json({message:err})
            }
            if(result){
                let token=jwt.sign({name: login.username,id:login._id},'key8088')
               
                res.json({status:1,message:"Login sucessfull",token})
                
            }else{
                res.json({message:'check email & password'})
            }
        })
    }else{
        res.json({ status:0,message:'User not found'})
    }
})    
}

const forgotPassword =async(req,res)=>{
    const {email}=req.body 
    const user =await User.findOne({email:email})
    if(!user){
        res.json({
            status:0,
            message:"No user Found"
        })
    }else{
        const otp= Math.floor(1000+Math.random()*9000)
        sendMail('neelakandanguhan@gmail.com','Verify OTP',`Your OTP --- ${otp}`)
        const updateUser =await User.findOneAndUpdate({email:email},{otp:otp})
        if(!updateUser){
            res.json({
                status:0,
                message:"Otp not sent"
            })
        }else{
            res.json({
                status:1,
                message:"OTP sent to your mail"
            })
        }
    }
    
  }
  
  const verifyOTP =async(req,res)=>{
    const {email,otp}=req.body
    const user =await User.findOne({email:email})
    if(!user){
        res.json({
            status:0,
            message:"No user Found"
        })
    }else{
        if(user.otp===otp){
            const update = await User.findOneAndUpdate({email:email},{otpVerified:true})
            if(update){
                res.json({
                    status:1,
                    message:'OTP verified'
                })
            }
        }else{
            res.json({
                status:0,
                message:'OTP Does not match'
            })
        }
    }
  }
  

module.exports={signUp,signIn,forgotPassword,verifyOTP}
