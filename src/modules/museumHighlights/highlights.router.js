import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import { addHighlight, deleteHighlight, getAllHighlights, getSingleHighlight, updateHighlight } from './highlights.controler.js';
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';


const highlightRouter = express.Router();

//addArtifact
highlightRouter.post('/highlights',fileUpload('imgCover'),addHighlight)

//getAllArtifacts
highlightRouter.get('/highlights',getAllHighlights)


// get singel highlight data
highlightRouter.get('/highlights/:id',validation(paramsIdVal),getSingleHighlight)

// update artifcat
highlightRouter.put('/highlights/:id',updateHighlight)

// delete artifcat
highlightRouter.delete('/highlights/:id',deleteHighlight)

export {
    highlightRouter
}