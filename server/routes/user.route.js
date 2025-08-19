import express from "express";
import { deleteAllUsers, deleteUser, getUsers, test, updateUser } from "../controllers/user.controller.js";
import verifyUserToken from "../utils/verifyUser.js";
import { upload } from "../utils/multer.js";

const userRoute = express.Router()

userRoute.post('/test',test)
userRoute.post('/update/:id',verifyUserToken,upload.single('avatar'),updateUser)
userRoute.delete('/delete/:id',verifyUserToken,deleteUser)
userRoute.delete('/deleteall/:id',deleteAllUsers)
userRoute.get('/read',getUsers)

export default userRoute;