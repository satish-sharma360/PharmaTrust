import express from "express";
import { addEmpoyeeLeave, deleteEmployeeLeave, getEmployeeLeave, getUpdateEmployeeLeave, updateEmployeeLeave } from "../controllers/empLeave.controller.js";

const empLeave = express.Router()

empLeave.post('/create',addEmpoyeeLeave)
empLeave.get('/get',getEmployeeLeave)
empLeave.put('/update/:id',updateEmployeeLeave)
empLeave.delete('/delete/:id',deleteEmployeeLeave)
empLeave.get('/get/:id',getUpdateEmployeeLeave)


export default empLeave