import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        typeof: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})
const Project = mongoose.model("Project",projectSchema);

export{ Project}