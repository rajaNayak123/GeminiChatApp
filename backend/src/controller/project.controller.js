import {Project} from "../models/project.model.js"

const createPorject = async (req,res) =>{
    const {name} = req.body;
    const {userId} = req.user._id;

    try {
        if ([name,userId].some((field) => {field?.trim() === ""})) {
            return res.status(400).json({ error: "All fields must be required" });
        }
    
        const newProject = await Project.create({name,userId});
    
        return res.status(201).json(newProject);
    
    } catch (error) {
        console.log(error);
        res.status(400).message("Error creating project",error)
    }
}

export {createPorject};