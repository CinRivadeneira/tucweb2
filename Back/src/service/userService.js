
const User = require("../model/user");
const crypto = require("crypto");

const RegisterService = async (email, empresa, password) => {
    try {
        const id = crypto.randomUUID();
        await User.create({
            id,
            email,
            empresa,
            password
        });
        return id;
    } catch (error) {
        return false;
    }
}



const LoginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email }).select("-id").select("-__v").select("-id");
        if (user.password === password){
            return user.empresa;
        }else{
            return "";
        }
    }catch(error){
        return "";
    }
}



module.exports = { RegisterService, LoginService};