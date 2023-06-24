// const { create } = require("../databasevariables/studentdb");
const signup = require("../authentications/user/signup")

const choice = {
    get:(req,res)=>{
        res.json({status:true,
            msg:"ready to accept choices from backend"});
    },
    create:async (req,res)=>{
        var data = req.body;
        console.log(data);
        if(await signup.studentexist(req.email)){

            data.forEach(function (item) {
                console.log("instaid: "+item.instaid);
                console.log("instaname: "+item.name);
            });
            res.json({
                success:true,
                msg:"choices were succesfully recieved"
            })
        }else{
            res.json({
                success:false,
                msg:"User Doesn't exist"
            });
        }
    }

}

module.exports = choice;