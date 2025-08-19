import express from 'express'
import { addSupplyRequest, deleteSupplyRequest, getSupplyRequest } from '../controllers/suppRequest.controller.js'

const supplyRequest = express.Router()

supplyRequest.post('/create',addSupplyRequest)
supplyRequest.get('/read',getSupplyRequest)
supplyRequest.delete('/delete/:id',deleteSupplyRequest)

export default supplyRequest