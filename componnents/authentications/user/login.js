const bcrypt = require("bcrypt");
const path=require("../../../path");
const student= require("../../databasevariables/studentdb"); 
const jwt = require("jsonwebtoken");
const { assign } = require("nodemailer/lib/shared");


const result={
post: async (req,res)=>{
    console.log(req.body);
    let {email , password} = req.body;
    if(email && password){
      email = email.toLowerCase();
      const result = await student.find({ email: email });
      console.log(result);
      if(result != null){
            const match =await bcrypt.compare(password, result[0].password);
            if(match){
              console.log(result[0].verified);
              if(result[0].verified == true){
                let token = jwt.sign({ id:result[0]._id, email: email}, process.env.SECRET_KEY);
                res.status(200).json({
                  status:true,
                  token:token,
                  msg:"Sucessfull Login"
                });
                // res.redirect("dashboard/"+ result[0]._id);

              }else{
                // res.redirect("signup/verifyotp/" + email );
                res.json({
                  success:false,
                  msg:"user not verified yet please verify",
                  redirecturl:"user/signup/verifyotp",
                  params:"email"
                });
              }

            }else{
              res.status(401).json({
                success:false,
                msg:"Password incorrect"
              });

            }


          }else{
            res.status(404).json({
              success:false,
              msg:"No Account Found"
            });
          }
  
  
    }else{
      res.status(400).json({success:false,
      msg:"One of the field Found Missing"});
  }
  },
  get:(req,res)=>{
    res.json({
      status:200,
      msg:"ready to login"
    })
    // res.sendFile(path+"/public/login.html");
  }
}

module.exports = result;