const student= require("../../componnents/databasevariables/studentdb"); 

async function  getallverifiedfemaleuser(){
    return await student.find({verified:true , gender: true}).select(['instauname','fullname']);
}
async function  existverifiedmaleuser(instauname){
    const exist  = await student.findOne({instauname:instauname ,verified:true , gender: false}).select('options');
    if(exist){
        console.log(exist);
        return exist;
    }
    return false;
}
async function match(){
    const females = await getallverifiedfemaleuser();
    females.forEach(async (female)=>{
        let call = await existverifiedmaleuser(female.instauname);
        // console.log(call);
        // console.log("...............next............");
        // if( call && call.){
            
        // }

    })
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
                await match();
                
                res.json({
                    success:true,
                    msg:"setting up",
                    // data:await match()
                });
            }else{
                res.json({success:false,msg:"Invalid Admin"});
            }
        }else{
            res.json({success:false,msg:"Username or Password Missing"});
        }
    }       
}


module.exports = result;