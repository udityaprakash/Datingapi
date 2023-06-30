const router = require("express").Router();

router.get('/home',
(req,res)=>{
    res.json({success:true,
    msg:"Ready to access admin"});
}
);