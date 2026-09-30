import Project from "../models/Project.js";
import apiResponse from "../utils/apiResponse.js";
import httpStatus from "../utils/httpCodes.js";
import CONSTANTS_MSG from "../utils/constantmessage.js";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const addProject = async (req, res) => {
  try {
    const { name, description, status, progress } = req.body;
    const project = await Project.create({
      name,
      description,
      status: status || "Planning",
      progress: progress ? Number(progress) : 0,
    });
    return apiResponse.success(res, project, "Project added", httpStatus.CREATED);
  } catch (err) {
    return apiResponse.error(res, err.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const editProject = async (req, res) => {
  try {
    const { id, name, description, status, progress, payload } = req.body;
    const source = payload || req.body;
    const updateData = {};
    if (source.name !== undefined) updateData.name = source.name;
    if (source.description !== undefined) updateData.description = source.description;
    if (source.status !== undefined) updateData.status = source.status;
    if (source.progress !== undefined) updateData.progress = Number(source.progress);

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
    return apiResponse.success(res, updated, "Updated", httpStatus.OK);
  } catch (err) {
    return apiResponse.error(res, err.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;
    const project = await Project.findByIdAndDelete(id);
    return apiResponse.success(res, project, "Deleted", httpStatus.OK);
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getProjectList = async (req, res) => {
  try {
    const list = await Project.find().sort({ _id: -1 });
    return apiResponse.success(res, list, CONSTANTS_MSG.SUCCESS, httpStatus.OK);
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const project = await Project.findById(id);
    if (!project) {
      return apiResponse.error(res, "Project not found", httpStatus.NOT_FOUND);
    }
    return apiResponse.success(res, project, CONSTANTS_MSG.SUCCESS, httpStatus.OK);
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};



const getProjectNameList = async (req, res) => {
  try {
    const data = await Project.find().select("name _id").lean();
    return apiResponse.success(res, data, CONSTANTS_MSG.SUCCESS, httpStatus.OK);
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};







const addTask = async (req, res) => {
  try {
    const { name, description, status, priority, project } = req.body;
    const todoData = {
      name,
      description: description || "",
      status: status || "Pending",
      priority: priority || "Medium",
    };
    if (project) {
      todoData.project = project;
    }
    const todo = await Todo.create(todoData);
    return apiResponse.success(res, todo, "Task added", httpStatus.CREATED);
  } catch (err) {
    return apiResponse.error(res, err.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const editTask = async (req, res) => {
  try {
    const { id, payload, name, description, status, priority, project } = req.body;
    const source = payload || { name, description, status, priority, project };
    const updateData = {};
    if (source.name !== undefined) updateData.name = source.name;
    if (source.description !== undefined) updateData.description = source.description;
    if (source.status !== undefined) updateData.status = source.status;
    if (source.priority !== undefined) updateData.priority = source.priority;
    if (source.project !== undefined) updateData.project = source.project || null;

    const updated = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    return apiResponse.success(res, updated, "Updated", httpStatus.OK);
  } catch (err) {
    return apiResponse.error(res, err.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findByIdAndDelete(id);
    return apiResponse.success(res, todo, "Deleted", httpStatus.OK);
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getTaskList = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyWord = "" } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const query = keyWord ? { name: { $regex: keyWord, $options: "i" } } : {};
    const [list, total] = await Promise.all([
      Todo.find(query)
        .populate("project", "name")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limitNum),
      Todo.countDocuments(query),
    ]);
    return apiResponse.success(
      res,
      {
        list,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      CONSTANTS_MSG.SUCCESS,
      httpStatus.OK
    );
  } catch (error) {
    return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};



export {
  addProject,
  editProject,
  deleteProject,
  getProjectList,
  getProjectDetails,
  getProjectNameList,
  addTask,
  editTask,
  deleteTask,
  getTaskList,
};
