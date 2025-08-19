import express from 'express'
import { google, signIn, signinEmp, signOut, signOutEmp, signUp } from '../controllers/auth.controller.js'


const authRoute = express.Router()

authRoute.post('/signup', signUp);
authRoute.post('/sign-up-emp',signinEmp);
authRoute.post('/signin',signIn);
authRoute.post('/google',google);
authRoute.post('/sign-out',signOut);
authRoute.post('/sign-out-emp',signOutEmp);

export default authRoute