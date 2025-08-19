import express from "express";
import { checkOrderID, createTask, deleteTask, getTask, getUpdateTask, updateTask } from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post('/create',createTask)
taskRouter.get('/read',getTask)
taskRouter.put('/update/:id',updateTask)
taskRouter.delete('/delete/:id',deleteTask)
taskRouter.get('/get/:id',getUpdateTask)
taskRouter.get('/checkorder',checkOrderID)

export default taskRouter;