import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';
import { addWorkShop, deleteWorkShop, getAllWorkShops, getSingleWorkShop, updateWorkShop } from './workShops.controler.js';

const workShopRouter = express.Router();

//add workShop
workShopRouter.post('/workShops',fileUpload('imgCover'),addWorkShop)

//getAll workShops
workShopRouter.get('/workShops',getAllWorkShops)

// get singel workShop data
workShopRouter.get('/workShops/:id',validation(paramsIdVal),getSingleWorkShop)

// update workShop
workShopRouter.put('/workShops/:id',updateWorkShop)

// delete workShop
workShopRouter.delete('/workShops/:id',deleteWorkShop)

export {
    workShopRouter
}