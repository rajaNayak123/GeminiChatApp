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

  try {
    if (!userId) {
      res.status(404).json({ error: "UserId is required" });
    }

    const allProjects = await Project.find({ users: userId });

    return res.status(200).json({ projects: allProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting all project" });
  }
};

const addUserToProject = async (req, res) => {
    try {
      const { projectId, users, userId } = req.body;
      
      if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid or missing projectId" });
      }
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid or missing userId" });
      }
      if (!Array.isArray(users) || users.some(id => !mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ message: "Invalid userId(s) in users array" });
      }
  
      const project = await projectModel.findOne({ _id: projectId, users: userId });
      if (!project) {
        return res.status(403).json({ message: "User not authorized for this project" });
      }
  
      const updatedProject = await projectModel.findByIdAndUpdate(
        projectId,
        { $addToSet: { users: { $each: users } } },
        { new: true }
      );
  
      res.status(200).json({ updatedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding users to project" });
    }
};

export { 
    createPorject, 
    getAllProjects, 
    addUserToProject 
};
