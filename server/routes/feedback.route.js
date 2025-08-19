import express from "express";
import { createFeedback, deleteFeedback, getFeedback, updateFeedback } from "../controllers/feedback.controller.js";

const feedbackRoute = express.Router()

feedbackRoute.post('/create',createFeedback)
feedbackRoute.get('/read',getFeedback)
feedbackRoute.put('/update/:id',updateFeedback)
feedbackRoute.delete('/delete/:id',deleteFeedback)

export default feedbackRoute