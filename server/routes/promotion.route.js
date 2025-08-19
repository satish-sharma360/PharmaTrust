import express from "express";
import { checkCouponCode, checkPromotionID, createPromotion, deletePromotion, getPromotion, getUpdatePromotion, updatePromotion } from "../controllers/promotion.controller.js";

const promotionRoute = express.Router()

promotionRoute.put('/create',createPromotion)
promotionRoute.get('/read',getPromotion)
promotionRoute.put('/update/:id',updatePromotion)
promotionRoute.delete('/delete/:id',deletePromotion)
promotionRoute.get('/get/:id',getUpdatePromotion)
promotionRoute.get('/check-unique-id',checkPromotionID)
promotionRoute.get('/check-unique-code',checkCouponCode)

export default promotionRoute;