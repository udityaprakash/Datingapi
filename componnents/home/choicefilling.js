const student= require("../databasevariables/studentdb");
const signup = require("../authentications/user/signup")

async function userinfo(id){
    return await student.findById(id);
}

const choice = {
    get:(req,res)=>{
        res.json({status:true,
            msg:"ready to accept choices from backend"});
    },
    create:async (req,res)=>{
        var data = req.body;
        try{
            if(await signup.studentexist(req.email) && data){
                let userget = await userinfo(req.userId);
                let maxlist = userget.subscription.plan * 5;
                currentlist = await userinfo(req.userId);
                if(maxlist >= data.length + currentlist.options.length){
                    var i =0;
                    for(i=0;i<data.length;i++){

                        await student.findOneAndUpdate(
                            {_id: req.userId},
                            {$push:{options: {instaid:data[i].instaid, name: data[i].name, priority:i}}},
                            {new:true}
                            ).then((ser)=>{
                            }).catch((err)=>{
                                
                                res.json({
                                    success:false,
                                    error:err,
                                    msg:"There was an Error in accepting choices"
                                });
                            });    
                        }
                        if(i == data.length){
                        await student.findByIdAndUpdate(req.userId,{optionsaddedon: Date.now()}).then((he)=>{

                            res.json({
                                success:true,
                                msg:"choices been recorded successfully"
                            });
                        }

                        ).catch((err)=>{
                            res.json({
                                success:true,
                                error:err,
                                msg:"choices been recorded successfully"
                            });

                        });

                    }else{
                        res.json({
                            success:false,
                            accepted:i,
                            msg:"allchoices were not accepted"
                        });
                    }
                        // data.forEach(async function (item) {
                        //         // console.log(currentlist.options.length);
                        //         });
                    }else{

                        res.json({
                            success:false,
                            limitleft: maxlist - currentlist.options.length,
                            msg:"Limit exceeding with current subscription"
                        });
                    }
            }else{
                res.json({
                    success:false,
                    msg:"User Doesn't exist"
                });
            }

        }catch{
            res.json({success:false,msg:"there was an error"});
        }
    }

}

module.exports = choice;