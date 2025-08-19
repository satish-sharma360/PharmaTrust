import express from "express";
import { addEmpoyeeSalary, deleteEmployeeSalary, getEmployeeSalary, getUpdateEmployeeSalary, updateEmployeeSalary } from "../controllers/empSalary.controller.js";

const empSalaryRoute = express.Router()

empSalaryRoute.post('/create',addEmpoyeeSalary)
empSalaryRoute.get('/read',getEmployeeSalary)
empSalaryRoute.put('/update/:id',updateEmployeeSalary)
empSalaryRoute.delete('/delete/:id',deleteEmployeeSalary)
empSalaryRoute.get('/get/:id',getUpdateEmployeeSalary)

export default empSalaryRoute;