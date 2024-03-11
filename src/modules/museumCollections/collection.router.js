import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { addCollection, deleteCollection, getAllCollections, getSingleCollection, updateCollection } from './collection.controler.js';
import { validation } from '../../middelwar/validation.js';
import { paramsIdVal } from '../user/user.validation.js';
import { allowedTo, protectedRoutes } from '../user/user.controler.js';


const collectionRouter = express.Router();

//add collection
collectionRouter.post('/collections',protectedRoutes,allowedTo('user','admin'),fileUpload('imgCover'),addCollection)

//get All collections
collectionRouter.get('/collections',protectedRoutes,allowedTo('user','admin'),getAllCollections)

// get singel highlight data
collectionRouter.get('/collections/:id',protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),getSingleCollection)

// update collection
collectionRouter.put('/collections/:id',protectedRoutes,allowedTo('user','admin'),updateCollection)

// delete collection
collectionRouter.delete('/collections/:id',protectedRoutes,allowedTo('user','admin'),deleteCollection)

export {
    collectionRouter
}