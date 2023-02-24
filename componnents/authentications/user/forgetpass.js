const bcrypt = require("bcrypt");
const student = require("../../databasevariables/studentdb");
const path=require("../../../path");
const nodemailer=require("nodemailer");
const otpGenerator = require('otp-generator');
const signup = require("./signup");
require('dotenv').config();
var Emailvalidator = require("email-validator");
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'udityap.davegroup@gmail.com',
      pass: process.env.EMAILPASSWORD
    }
  });

const result={
    get_enteremail:(req,res)=>{
        // res.sendFile(path+"/public/forgetenteremail.html");
        res.json({
          success:true,
          method:"post",
          ready:"post method here with email to verify email for forget password"
        })
    },
    post_enteremail:async (req , res)=>{
        const { email } = req.body;
        try{
          let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
          let indatabaseotpstored= false;


          if (await signup.studentexist(email)){
            console.log("ueser exixt 1");
            const resu = await student.find({email:email});
            console.log("ueser exixt 2");
            if(resu.length!=0){
              console.log("ueser exixt 3");
              const updat = await student.findOneAndUpdate({email:email}, {otp:otp , verified:false});
              console.log("ueser exixt 4");

              console.log("updated for reset password : "+updat);
              indatabaseotpstored = true;

            }else{
              res.json({
                success:false,
                msg:"User Not Found"
              });
            }   
          }
          var mailOptions = {
                from: 'udityap.davegroup@gmail.com',
                to: email,
                subject: 'Reset Password for DAWAY',
                html: `<div style="max-width: 90%; margin: auto; padding-top: 20px">
              <p style="margin-bottom: 30px;">Please enter the OTP to get started</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1></div>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                  console.log("not send : "+error);
                  res.json({success:false,msg:"otp not send to specified email"})
            } else {
                  if(indatabaseotpstored){
                    console.log('Email sent: ' + info.response);
                    res.json({
                        success:true,
                        msg:"OTP send Successfully."
                    });

                  }else{
                    res.json({
                      success:false,
                      msg:"OTP not stored in database but OTP send to email."
                    })
                  }
        
                  
            }
          });  
        }catch{
          res.json({
            success:false,
            msg:"Internal Server Error."
          });

        }



    },
    post_otp_verification:
    async (req,res)=>{
      const {otp , email} = req.body ;
      if(Emailvalidator.validate(email) && otp && email){

          if (signup.studentexist(email)){
            const resu = await student.find({ email : email});
            if(resu.length!=0){
              if(resu[0].otp == otp){
                const fin = await student.findOneAndUpdate({email : email},{otp : null , verified : true});
              
                res.json({
                  success:true,
                  token:resu[0].id,
                  msg:"user verified successfully",
                  result:fin
                });
  
              }else{
                res.json({success:false,
                msg:"Invalid OTP"});
                
              }
  
  
  
            }else{
              res.json({success:false,
                msg:"user doesn't exist"});
  
            }
          }else{
            res.json({success:false,
            msg:"user is already verified"});
          }
  
  
    }else{
      res.json({success:false,
        msg:"All fields required or invalid email"});

    }
  },
  Set_password: async (req,res)=>{
    let {id, password}= req.body;
          try{
            const query = await student.find({_id : id});

            if(query.length!=0){
                const salt= parseInt(process.env.SALT);
                const hashpassword = await bcrypt.hash(password, salt); 
                const que = await student.findOneAndUpdate({_id:id},{password:hashpassword});
                  console.log(que);
                  res.json({
                    success:true,
                    token:query[0].id,
                    msg:"user password reset successfully"
                  });
  
            }else{
              res.json({success:false,
                msg:"user doesn't exist"});
  
            }
          }catch(err){
            res.json({success:false,
            msg:"Some Internal server error"});
          }

  }

}

module.exports = result;