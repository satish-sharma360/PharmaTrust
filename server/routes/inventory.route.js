import express from "express";
import { addInventoryItem, deleteInventoryItem, getInventoryItem, getItemToupdate, updateInventoryItem } from "../controllers/inventory.controller.js";
import  {upload}  from "../utils/multer.js";

const inventoryRoute = express.Router()

inventoryRoute.post('/create',upload.single("image"),addInventoryItem)
inventoryRoute.get('/read',getInventoryItem)
inventoryRoute.put('/update/:id',upload.single("image"),updateInventoryItem)
inventoryRoute.get('/getsingleitem/:id',getItemToupdate)
inventoryRoute.delete('/delete/:id',deleteInventoryItem)

export default inventoryRoute;