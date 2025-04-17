const ApiError = require("../utils/ApiError");
const cloudinary = require("cloudinary").v2;
const ApiResponse = require("../utils/ApiResponse");
const TaskModel = require("../models/taskModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const addTask = async (req, res, next) => {
  try {
    const { taskTitle, taskDescription, taskDueDate } = req.body;

    if (!taskTitle || !taskDescription || !taskDueDate) {
      return next(new ApiError("filed are missing", 500));
    }

    if (!req.files || !req.files.taskImage) {
      return next(new ApiError("task images are missing", 500));
    }

    const uploadData = await cloudinary.uploader.upload(
      req.files.taskImage.tempFilePath
    );

    const taskData = new TaskModel({
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      taskDueDate: taskDueDate,

      taskUserId: req.tokenData.userId,
      taskImgUrl: uploadData.secure_url,
      taskImgId: uploadData.public_id,
    });

    const saveData = await taskData.save();

    res
      .status(200)
      .json(new ApiResponse(200, " task create successfully", saveData));
  } catch (error) {
    next(error);
  }
};

const allTask = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    // console.log(userId);

    const allTask = await TaskModel.find({ taskUserId: userId });

    res.status(200).json(new ApiResponse(200, "here is all data", allTask));
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    // console.log("tokendar", req.tokenData);
    const userId = req.tokenData.userId;

    const { taskTitle, taskDueDate, taskDescription, taskStatus } = req.body;

    const taskFind = await TaskModel.findOne({
      _id: req.params.taskId,
      taskUserId: userId,
    });

    // console.log("kkkkkk", taskStatus);
    if (!taskFind) {
      return next(new ApiError("task not found with taskId", 500));
    }
    // console.log("kkkkkk", taskFind);
    if (req.files) {
      await cloudinary.uploader.destroy(taskFind.taskImgId);
      const uploadNewImg = await cloudinary.uploader.upload(
        req.files.taskImage.tempFilePath
      );

      // console.log("kkkkkk",uploadNewImg );
      //   console.log("ggggggggggggggggg file");
      const newUpdatedData = {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDueDate: taskDueDate,
        taskImgUrl: uploadNewImg.secure_url,
        taskImgId: uploadNewImg.public_id,
        taskStatus: taskStatus,
      };

      const finalUpload = await TaskModel.findOneAndUpdate(
        { _id: req.params.taskId, taskUserId: userId },
        newUpdatedData,
        { new: true }
      );
      res
        .status(200)
        .json(new ApiResponse(200, "task Updated Successfully", finalUpload));
    } else {
      //   console.log("hh 3");
      const newUpdatedData = {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDueDate: taskDueDate,
        taskStatus: taskStatus,
      };
      const finalUpload = await TaskModel.findOneAndUpdate(
        { _id: req.params.taskId, taskUserId: userId },
        newUpdatedData,
        { new: true }
      );
      res
        .status(200)
        .json(new ApiResponse(200, "task Updated Successfully", finalUpload));
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    // console.log("hhhh");
    const userId = req.tokenData.userId;
    const taskId = req.params.taskId;
    // console.log("hh", taskId, userId);

    const findUser = await TaskModel.findOne({
      _id: taskId,
      taskUserId: userId,
    });

    // console.log("jj", findUser);
    if (!findUser) {
      return next(new ApiError("task not found", 500));
    }

    await cloudinary.uploader.destroy(findUser.taskImgId);

    const deleteUser = await TaskModel.findOneAndDelete({
      _id: taskId,
      taskUserId: userId,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "task delete successful", deleteUser));
  } catch (error) {
    next(error);
  }
};

module.exports = { addTask, allTask, updateTask, deleteTask };
