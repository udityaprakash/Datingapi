// const { create } = require("../databasevariables/studentdb");


const choice = {
    get:(req,res)=>{
        res.json({status:true,
            msg:"ready to accept choices from backend"});
    },
    create:(req,res)=>{

    }

}

module.exports = choice;