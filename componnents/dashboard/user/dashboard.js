
const student = require("../../databasevariables/studentdb");
// import '../../server.js';
const result={
get: async (req,res)=>{
    const id=req.params['id'];
      try{
        const  result = await student.find({_id:id});
        if(result.length!=0){
          // res.send("<center><h1>Dashboard</h1><p>email  -  "+result[0].email+"</p><p>fname  -  "+result[0].fname+"</p><p>lname  -  "+result[0].lname+"</p><p>password  -  "+result[0].password+"</center>");
          res.json({success:true,
          data:result[0]});
        }else{
          res.json({
            success:false,
            msg:"no such user found"
          });
        }
      }catch(err){
        res.json({status:"Internel server error",
            msg:"something wrong in backend"});
  
      }
    
  
  }


}

module.exports = result;