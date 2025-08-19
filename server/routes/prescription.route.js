import express from "express";
import { addPrescription, deletePrescription, getPrescription, getPrescriptionById, getUpdatePrescription, updatePrescription } from "../controllers/prescription.controller.js";

const prescriptionRoute = express.Router()

prescriptionRoute.post('/create',addPrescription)
prescriptionRoute.get('/read',getPrescription)
prescriptionRoute.get('/read/:id',getPrescriptionById)
prescriptionRoute.put('/update/:id',updatePrescription)
prescriptionRoute.delete('/delete/:id',deletePrescription)
prescriptionRoute.get('/get/:id',getUpdatePrescription)

export default prescriptionRoute