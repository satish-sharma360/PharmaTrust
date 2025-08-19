import express from "express";
import { checkDataExists, createDriver, deleteDriver, getDriver, getUpdateDriver, signIn, signOut, updateDriver, updateDriverPro } from "../controllers/driver.controller.js";
import verifyDriverToken from "../utils/verifyDriver.js";


const driverRouter = express.Router();

driverRouter.post('/create',createDriver)
driverRouter.get('/get-driver',getDriver)
driverRouter.put('/update-driver/:id',updateDriver)
driverRouter.delete('/delete-driver/:id',deleteDriver)
driverRouter.get('/get-driver/:id',getUpdateDriver)
driverRouter.get('/check',checkDataExists)
driverRouter.post('/signin',signIn)
driverRouter.post('/updatedriver/:id',verifyDriverToken,updateDriverPro)
driverRouter.get('/signout',signOut)

export default driverRouter;