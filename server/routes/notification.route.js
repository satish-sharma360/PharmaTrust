import express from "express";

const notificationRoute = express.Router()

const notification = [
    {id:1,message:'New supply request created'}
];

notificationRoute.get('/api/notification',(req,res)=>{
    res.json({success:true,notification})
})
export default notificationRoute;