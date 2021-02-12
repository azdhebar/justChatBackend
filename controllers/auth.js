const User = require("../models/user")
const {validationResult} = require('express-validator')
const fetch = require("node-fetch");

exports.login = (req,res)=>{

const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(400).json(error[0].msg)
}


const mobile = req.body.mobile

User.find({mobile:mobile}).exec((err,user)=>{
    if(err || !user){
        let otpgen = generateOTP();
        const user = new User({
            mobile:req.body.mobile,
            otp: otpgen
        })
        user.save((err,user)=>{
            if(err||!user){
                console.log(err)
                return res.status(400).json({
                    error:"Something Went Wrong"
                })
            }
            fetch(`https://www.fast2sms.com/dev/bulkV2"`,{
                method:"POST",
                headers:{
                    "cache-control":"no-cache"
                },
                body:{
                    "authorization": "hvtqRK1BJmnHNXMao4bESOipIsck3lVwfgx7uLG0dPTYyUz85eFxymevTsl7bdAoUki0N2PwQn4Zh1WL",
                    "message": "This is a test message",
                    "language": "english",
                    "route": "q",
                    "numbers": user.mobile,
                }
            }).then(()=>{
                return res.json(user)
            })
            
        })
    }
    else{
        user.otp =   generateOTP()
       console.log(user)
        User.updateOne(
            {_id:user._id},
            {$set : user},
            {new:true,useFindAndModify:true},
            (err,usr)=>{
                if(err||!usr){
                    console.log(err)
                    return res.status(400).json({
                        error:"Something went wrong"
                    })
                }
            }
        )
        
        
        fetch(`https://www.fast2sms.com/dev/bulkV2"`,{
            method:"POST",
            headers:{
                "cache-control":"no-cache"
            },
            body:{
                "authorization": "hvtqRK1BJmnHNXMao4bESOipIsck3lVwfgx7uLG0dPTYyUz85eFxymevTsl7bdAoUki0N2PwQn4Zh1WL",
                "message": "This is a test message",
                "language": "english",
                "route": "q",
                "numbers": user.mobile,
            }
        }).then(()=>{
                return res.json(user)
            }
           )
           
            
        
        
    }
})

}


exports.verifyOtp=(req,res)=>{
const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(400).json(error[0].msg)
}

const {otp,_id} = req.body
console.log(_id)
User.findOne({_id:_id}).exec((err,usr)=>{
    console.log(usr.otp)
    if(err||!usr){
        console.log(err)
        return res.status(400).json({
           error: "User is Not Registered Yet"
        })

    }
    
    if(usr.otp==otp){
        return res.json(usr) 
    }
    return res.json({
        error:"Otp Is Wrong"
    })
})

}



//otp generator
function generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 