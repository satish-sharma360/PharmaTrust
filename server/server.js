import express from "express";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import authRouter from './routes/auth.route.js'
import driverRouter from './routes/driver.route.js'
import empLeaveRouter from './routes/empLeave.route.js'
import employeeRouter from './routes/employee.route.js'
import empSalaryRouter from './routes/empSalary.route.js'
import feedbackRouter from './routes/feedback.route.js'
import inventoryRouter from './routes/inventory.route.js'
import notificationRouter from './routes/notification.route.js'
import paymentRouter from './routes/payment.route.js'
import prescriptionRouter from './routes/prescription.route.js'
import promotionRouter from './routes/promotion.route.js'
import supplierRouter from './routes/supplier.route.js'
import supplyrequestRouter from './routes/supplyrequest.route.js'
import taskRouter from './routes/task.route.js'
import userRouter from './routes/user.route.js'

dotenv.config()
const app = express()
const Port = process.env.PORT || 8070
connectDB()

// ✅ Only keep this version
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use('/api/auth', authRouter)
app.use('/api/driver', driverRouter)
app.use('/api/empLeave', empLeaveRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/empSalary', empSalaryRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/prescription', prescriptionRouter)
app.use('/api/promotion', promotionRouter)
app.use('/api/supplier', supplierRouter)
app.use('/api/supplyrequest', supplyrequestRouter)
app.use('/api/task', taskRouter)
app.use('/api/user', userRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(Port, () => {
  console.log(`Server is running on port : ${Port} ...⚙️`)
});
