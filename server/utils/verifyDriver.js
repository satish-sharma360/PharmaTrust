import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

const verifyDriverToken = (req,res,next) =>{
    const token = req.cookies.driver_access_token;

    if (!token) {
        return next(errorHandler(401,'Unauthorized'))
    }

    jwt.verify(token , process.env.JWT_SECRRET,(err , driver)=>{
        if (err) {
            return next(errorHandler(403 , 'ForBidden'))
        }
        req.driver = driver
        next()
    })
}
export default verifyDriverToken