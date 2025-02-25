import mongoose from "mongoose";
import { Project } from "../models/project.model.js";


const createPorject = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    if (
      [name, userId].some(
        (field) => !field || (typeof field === "string" && field.trim() === "")
      )
    ) {
      return res.status(400).json({ error: "All fields must be required" });
    }

    const existingProject = await Project.findOne({ name, users: userId });

    if (existingProject) {
      return res
        .status(400)
        .json({ error: "A project with this name already exists" });
    }

    const newProject = await Project.create({ name, users: [userId] });

    return res.status(201).json(newProject);
  } catch (error) {
    console.log(error);

    // Handle duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Project name must be unique" });
    }

    res
      .status(400)
      .json({ error: "Error creating project", details: error.message });
  }
};

const getAllProjects = async (req, res) => {
  const userId = req.user._id;

  console.log("userId: " + userId);

  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    const allProjects = await Project.find({ users: userId });

    // console.log(allProjects);
    return res.status(200).json( allProjects );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting all project" });
  }
};

const addUserToProject = async (req, res) => {
    const { projectId, users } = req.body;
    const userId = req.user._id;
    console.log(userId);

    try {
      
      if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid or missing projectId" });
      }
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid or missing userId" });
      }
      if (!Array.isArray(users) || users.some(id => !mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ message: "Invalid userId(s) in users array" });
      }
  
      const project = await Project.findOne({ _id: projectId, users: userId });

      if (!project) {
        return res.status(403).json({ message: "User not authorized for this project" });
      }
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { users: { $each: users } } },
        userId,
        { new: true }
      );
  
      res.status(200).json({ updatedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding users to project" });
    }
};

const getOneProject = async (req,res) =>{
  const {projectId} = req.params;

  try {
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid or missing projectId" });
    }
  
    const project = await Project.findOne({_id: projectId}).populate('users');
  
    return res.status(200).json({project});
  } catch (error) {
    console.log(error);
    res.status(400).json({message:error.message})
  }
}
export { 
    createPorject, 
    getAllProjects, 
    addUserToProject,
    getOneProject
};
