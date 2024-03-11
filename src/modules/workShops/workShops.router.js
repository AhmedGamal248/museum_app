import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';
import { addWorkShop, deleteWorkShop, getAllWorkShops, getSingleWorkShop, updateWorkShop } from './workShops.controler.js';
import { allowedTo, protectedRoutes } from '../user/user.controler.js';

const workShopRouter = express.Router();

//add workShop
workShopRouter.post('/workShops',protectedRoutes,allowedTo('user','admin'),fileUpload('imgCover'),addWorkShop)

//getAll workShops
workShopRouter.get('/workShops',protectedRoutes,allowedTo('user','admin'),getAllWorkShops)

// get singel workShop data
workShopRouter.get('/workShops/:id',protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),getSingleWorkShop)

// update workShop
workShopRouter.put('/workShops/:id',protectedRoutes,allowedTo('user','admin'),updateWorkShop)

// delete workShop
workShopRouter.delete('/workShops/:id',protectedRoutes,allowedTo('user','admin'),deleteWorkShop)

export {
    workShopRouter
}