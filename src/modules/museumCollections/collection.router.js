import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { addCollection, deleteCollection, getAllCollections, getSingleCollection, updateCollection } from './collection.controler.js';
import { validation } from '../../middelwar/validation.js';
import { paramsIdVal } from '../user/user.validation.js';


const collectionRouter = express.Router();

//add collection
collectionRouter.post('/collections',fileUpload('imgCover'),addCollection)

//get All collections
collectionRouter.get('/collections',getAllCollections)

// get singel highlight data
collectionRouter.get('/collections/:id',validation(paramsIdVal),getSingleCollection)

// update collection
collectionRouter.put('/collections/:id',updateCollection)

// delete collection
collectionRouter.delete('/collections/:id',deleteCollection)

export {
    collectionRouter
}