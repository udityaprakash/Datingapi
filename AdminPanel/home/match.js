const student= require("../../componnents/databasevariables/studentdb"); 
function prt(string){
    console.log(string);
}

async function existandisfree(instaid,femaleinsta){
    var k = await student.findOne({instauname:instaid,'matchedwith.name':null,'matchedwith.instaid':null, verified:true, gender: false}).select(['options']);
    if(k && k.options.length!=0){
        var mk = k.options.findIndex(x => x.instaid === femaleinsta);
        if(mk==-1){
            prt("its -1");
            return false;
        }
        else{
            return true;
        }
        
    }
    return false;
}

async function getfemaleoptions(id){
    var k = await student.findOne({_id:id, verified:true , gender: true}).select(['options']);
    if(k){
        return k;
    }
    return false;
}

async function  getallverifiedfemaleuser(){
    return await student.find({'matchedwith.name':null,'matchedwith.instaid':null, verified:true , gender: true}).select(['_id','instauname','fullname']);
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
                // await match();
                var count = 0;
                const Allfemaleids = await getallverifiedfemaleuser();
                prt(Allfemaleids);  
                for(var i=0;i<Allfemaleids.length
                    ;i++){
                    var userdetail = await getfemaleoptions(Allfemaleids[i]._id);
                    // prt(userdetail);
                    var j=0;
                    for(j=0;j<userdetail.options.length;j++){
                        var ins = userdetail.options.findIndex(x => x.priority == j);
                        // prt(ins);
                        // prt(userdetail.options[ins].instaid+"  ---  "+Allfemaleids[i].instauname);
                        // prt(await existandisfree(userdetail.options[ins].instaid, Allfemaleids[i].instauname));
                        if(await existandisfree(userdetail.options[ins].instaid,Allfemaleids[i].instauname)){
                            prt("hello : "+userdetail.options[ins]);
                            try{
                                var f = await student.findByIdAndUpdate(Allfemaleids[i]._id,{
                                    'matchedwith.instaid':userdetail.options[ins].instaid,
                                    'matchedwith.name':userdetail.options[ins].name
                                });
                                prt(Allfemaleids[i].instauname+" here is female "+Allfemaleids[i].fullname);
                                
                                var m = await student.findOneAndUpdate({instauname:userdetail.options[ins].instaid},{
                                    'matchedwith.instaid':Allfemaleids[i].instauname,
                                    'matchedwith.name': Allfemaleids[i].fullname
                                });
                                count++;


                            }catch(err){
                                prt(err);
                            }
                            break;
                        }
                    }
                }

                res.json({
                    success:true,
                    msg:"setting up",
                    matched:count,
                    data: (Allfemaleids.length > 0) ? Allfemaleids : 'Empty'
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