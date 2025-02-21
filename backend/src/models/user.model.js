import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            id: this._id,
            email:this.email
        },
        process.env.TOKEN_SECRET,
        {expiresIn:process.env.TOKEN_EXPIRE}
    )
}
const User = mongoose.model('User',userSchema);

export {User};