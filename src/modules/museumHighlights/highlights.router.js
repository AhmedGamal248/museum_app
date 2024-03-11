import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { addHighlight, deleteHighlight, getAllHighlights, getHighlightWithAi, getSingleHighlight, updateHighlight } from './highlights.controler.js';
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';
import { allowedTo, protectedRoutes } from '../user/user.controler.js';


const highlightRouter = express.Router();

//addArtifact
highlightRouter.post('/highlights',protectedRoutes,allowedTo('user','admin'),fileUpload('imgCover'),addHighlight)

//getAllArtifacts
highlightRouter.get('/highlights',protectedRoutes,allowedTo('user','admin'),getAllHighlights)


// get singel highlight data
highlightRouter.get('/highlights/:id',protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),getSingleHighlight)

// update artifcat
highlightRouter.put('/highlights/:id',protectedRoutes,allowedTo('user','admin'),updateHighlight)

// delete artifcat
highlightRouter.delete('/highlights/:id',protectedRoutes,allowedTo('user','admin'),deleteHighlight)


highlightRouter.get('/highlightsAi',protectedRoutes,allowedTo('user','admin'),getHighlightWithAi)

export {
    highlightRouter
}