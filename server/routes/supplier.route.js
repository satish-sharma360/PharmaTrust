import express from 'express'
import { addSupplier, deleteSupplier, getSupplier, getUpdateSupplier, updateSupplier } from '../controllers/supplier.controller.js';

const supplierRoute = express.Router()

supplierRoute.post('/create',addSupplier)
supplierRoute.get('/read',getSupplier)
supplierRoute.put('/update/:id',updateSupplier)
supplierRoute.delete('/delete/:id',deleteSupplier)
supplierRoute.get('/get/:id',getUpdateSupplier)

export default supplierRoute;