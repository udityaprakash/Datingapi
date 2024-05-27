const bcrypt = require("bcrypt");
const path=require("../../../path");
var Emailvalidator = require("email-validator");
require('dotenv').config()
const nodemailer=require("nodemailer");
const otpGenerator = require('otp-generator');
const student = require("../../databasevariables/studentdb");
 

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matchup143143@gmail.com',
    pass: process.env.EMAILPASSWORD
  }
});




const result={
post: async (req,res)=>{
  try{
    console.log(req.body,"    next   ", req.file.size);
    let {fullname , instausername ,password , email, gender, phonenumber}= req.body;
    // console.log(req.body);
    if(req.file.size > 5242880){
      res.json({error:"true",msg:"file size must be less then 5 MB"})
    }
    var hashedpassword;
    if(fullname && instausername && password && email && phonenumber){
        const salt= parseInt(process.env.SALT);
        hashedpassword = await bcrypt.hash(password, salt);
        email=email.toLowerCase();  
        try {

          if(Emailvalidator.validate(email)){
              if(await result.studentexist(email)){
                res.json({success:false,
                msg:"user already exists"}); 
              }else{
                let filedisc = 'profile/' + req.file.filename;
                const user= new student({
                  fullname:fullname,
                  instauname:instausername,
                  password:hashedpassword,
                  email:email,
                  pnumber:phonenumber,
                  gender:(gender == null) ? null : gender,
                  profileurl: filedisc
                });

                  await user.save().then((user)=>{
                    res.status(200).json({
                      success:true,
                      msg:"User Recorded Successfully"
                    });
                    // res.redirect("signup/verifyotp/"+email);

                  }).catch((err)=>{

                    res.status(400).json({
                      success:false,
                      error:err,
                      msg:"User not been recorded as" + err
                    });

                  });
            }
  
        }else{
          res.json({
              success:false,
              msg:"Invalid Email Format"
            });

        }
          
        } catch (error) {
          console.log("error:"+error);
          res.json({
            success:false,
            msg:"Something not good"
          });
      }
  
    }else{
        res.json({
        success:false,
        msg:"One of the field Found Missing"
      });
    }

  }catch(err){
    console.log("error in signup.post() -> "+err);
  }
  
  },
  get:(req,res)=>{
    res.json({
            status:200,
            msg:"ready to signup"
          });

    // res.sendFile(path+"/public/signup.html");
  },

  verifyotp : async (req,res)=>{
    let email=req.params['email'];
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});

    if(Emailvalidator.validate(email)){
      if(await result.studentexist(email)){
        var u = await student.findOne({email : email});
        if(u.verified == true){
          res.json({
            success:false,
            msg:"user already verified"
          });
        }else{
          try{
            const sa = await student.findOneAndUpdate({email:email},{otp:otp});

            var mailOptions = {
                        from: 'matchup143143@gmail.com',
                        to: email,
                        subject: 'Verify user Account',
                        html: `
                    <div
                      class="container"
                      style="max-width: 90%; margin: auto; padding-top: 20px"
                    >
                      <h2>Welcome to MATCHUP.</h2>
                      <h4>Greatings of the day </h4>
                      <p style="margin-bottom: 30px;">Please enter the OTP to get started</p>
                      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                 </div>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log("not send :"+error);
                          res.json({
                            success:false,
                            msg:"OTP not send to Email"
                          });
                        } else {
                          console.log('Email sent: ' + info.response);
                          res.json({success:true,
                          msg:"OTP send to email"});
                        }
            });

            // res.sendFile(path+"/public/signupotpverification.html");



          }catch(err){
            res.json({
                        success:false,
                        msg:"Either email invalid or sender email invalid"
            });

          }
        }

      }else{
        res.json({
          success:false,
          msg:"Email does not exist"
        });
      }
    }else{
      res.json({
        success:false,
        msg:"Invalid Email Format"
      });
    }
    

  },
  studentexist: async (email)=>{
    var u = await student.find({email : email});
    if(u.length!=0){
      console.log("user found\n");
      return true;
    }
    else{
      console.log("user not found\n");
      return false; 
    }

  },
  checkotp:async (req,res)=>{
    const {otp}=req.body;
    const email= req.params['email'];

    if(Emailvalidator.validate(email) &&  otp){
      var resu = await student.find({email:email});
        if(resu.length!=0){
        if (resu[0].verified == false){
            if(resu[0].otp == otp){
              var result = await student.findOneAndUpdate({email:email},{otp:null,verified:true});
              console.log(result);
              res.json({
                success:true,
                // token:resu[0]._id,
                result:result,
                msg:"user verified successfully"
              });

            }else{
              res.json({success:false,
              msg:"OTP Incorrect"});
              
            }



          }else{
              res.json({success:false,
              msg:"user is already verified"});
              
            }
          }else{
            res.json({success:false,
            msg:"user doesn't exist"});
        }


  }else{
    {
      res.json({success:false,
      msg:"OTP required"});
  }
  }
}
};

module.exports = result;