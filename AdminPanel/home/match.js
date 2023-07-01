const student= require("../../componnents/databasevariables/studentdb"); 

async function  getallverifieduser(){
    return await student.find({verified:true},).select(['instauname','fullname']);
}

async function match(){
    return await getallverifieduser()
}

//this will be replaced with database in future
const Admin = {username:"Ajit",password:"QWERty@123"};

const result ={ 
    check:(req, res)=>{
            res.json({success:true,msg:"ready to set database forfinding best match"});
            }   ,
    settingdata: async (req,res)=>{
        const {username , password } = req.body;
        if(username && password){

            if(username == Admin.username && password == Admin.password){
    
                
                res.json({success:true,msg:"setting up",data:await match()});
            }else{
                res.json({success:false,msg:"Invalid Admin"});
            }
        }else{
            res.json({success:false,msg:"Username or Password Missing"});
        }
    }       
}


module.exports = result;