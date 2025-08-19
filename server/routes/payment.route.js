import express from 'express'
import { addPayment, deletePayment, getPayment, getUpdatePayment, updatePayment } from '../controllers/payment.controller.js';

const paymentRouter = express.Router()

paymentRouter.post('/create',addPayment)
paymentRouter.get('/read',getPayment)
paymentRouter.put('/update/:id',updatePayment)
paymentRouter.delete('/delete/:id',deletePayment)
paymentRouter.get('/get/:id',getUpdatePayment)

export default paymentRouter;