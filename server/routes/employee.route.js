import express from "express";
import { addEmployee, deleteEmployee, getEmployee, getUpdateEmployee, updateEmployee } from "../controllers/employee.controller.js";

const employeeRoute = express.Router()

employeeRoute.post('/create' ,addEmployee)
employeeRoute.get('/get/:id' ,getUpdateEmployee)
employeeRoute.get('/get' ,getEmployee)
employeeRoute.put('/update/:id' ,updateEmployee)
employeeRoute.delete('/delete/:id' ,deleteEmployee)

export default employeeRoute