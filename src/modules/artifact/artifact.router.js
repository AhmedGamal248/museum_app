import express from 'express'
import { addArtifactVal } from './artifact.validation.js';
import { addArtifact, deleteArtifact, getAllArtifacts, updateArtifact } from './artifact.controler.js';
import { validation } from '../../middelwar/validation.js';
import { fileUpload } from '../../fileUpload/uploads.js';



const artifactRouter = express.Router();

//addArtifact
artifactRouter.post('/artifact',fileUpload('imgCover'),addArtifact)

//getAllArtifacts
artifactRouter.get('/artifact',getAllArtifacts)


// update artifcat
artifactRouter.put('/artifact/:id',updateArtifact)

// delete artifcat
artifactRouter.delete('/artifact/:id',deleteArtifact)

export {
    artifactRouter
}