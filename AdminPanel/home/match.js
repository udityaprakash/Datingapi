const student= require("../../componnents/databasevariables/studentdb"); 
function prt(string){
    console.log(string);
}

async function getinstaid(user , priority){
    let u = await student.findOne({instauname:user,verified:true ,gender:true}).select(['options']);
    // prt(u);
    for(let m = 0 ; m<u.options.length; m++){

        if(u.options[m].priority == priority){
            // prt(u.options[m].instaid+' is this person we looked for--------------');
            return u.options[m].instaid;
        }
    }
    // return 0;
}

async function  getallverifiedfemaleuser(){
    return await student.find({verified:true , gender: true}).select(['instauname','fullname','options']);
}
async function  existverifiedmaleuser(instauname,femaleinstaid){
    const exist  = await student.findOne({instauname:instauname ,verified:true , gender: false}).select('options');
    // prt("exuistance of user "+exist);
    if(exist){
        for(let j =0;j<exist.options.length; j++){
            if(exist.options[j].instaid == femaleinstaid){

                return true;
            }
        }

        // console.log("here this the user "+exist);
    }
    return false;
}
async function match(){
    const females = await getallverifiedfemaleuser();
    // prt(females);
    for(let instance = 0; instance < females.length; instance++){

        for (let c = 0; c <
            females[instance].options.length
            // 2
            ; c++ ){
            let id = await getinstaid(females[instance].instauname, c);
    
            // prt(`${id} printed here above`);
            let call = await existverifiedmaleuser(id,females[instance].instauname);
            console.log("here we get male persons option"+call);
            if(call){
                console.log("...............next............");
                break ;
            }
        }
        // if( call && call.){
            
        // }
    }
    // females.forEach(async (female)=>{
    // });
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