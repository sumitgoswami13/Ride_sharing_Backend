const userService = require('../services/userService')

const signuo = async(req,res)=>{
    try{
    const result = await userService.signup(req.body);
    res.status(result.status).json(result)
    }
    catch(error){
        res.status(500).json(error.msg)
    }
}

const Login = async( req,res)=>{
    try{
        const result = await userService.login(req.body);
        res.status(result.status).json(result);
    }
    catch(error){
        res.status(500).json(error.msg)
    }
}

module.exports={
    signuo,
    Login
}