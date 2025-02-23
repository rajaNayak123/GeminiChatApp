import {Project} from "../models/project.model.js"

const createPorject = async (req,res) =>{
    const {name} = req.body;
    const userId = req.user._id;

    try {
        if ([name, userId].some((field) => !field || (typeof field === "string" && field.trim() === ""))) {
            return res.status(400).json({ error: "All fields must be required" });
        }

        const existingProject = await Project.findOne({ name, users: userId });

        if (existingProject) {
            return res.status(400).json({ error: "A project with this name already exists" });
        }

        const newProject = await Project.create({ name, users: [userId] });
    
        return res.status(201).json(newProject);
    
    } catch (error) {
        console.log(error);

         // Handle duplicate key error (MongoDB error code 11000)
         if (error.code === 11000) {
            return res.status(400).json({ error: "Project name must be unique" });
        }
        
        res.status(400).json({ error: "Error creating project", details: error.message });

    }
}

export {createPorject};