const express = require("express");
const router = express.Router();
const {tokenChecker}= require("../middleware/authChecker")
const {addTask, allTask, updateTask ,deleteTask} = require("../controllers/taskControllers")


router.post("/add-task" ,tokenChecker ,addTask);
router.get("/all-task" ,tokenChecker ,allTask);
router.put("/update-task/:taskId" ,tokenChecker ,updateTask);
router.delete("/delete-task/:taskId" ,tokenChecker ,deleteTask);

module.exports = router;
