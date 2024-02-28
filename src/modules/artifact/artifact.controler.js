import { artifactModel } from '../../../databases/models/artifactModel.js'
import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../../middelwar/catchError.js';
          
cloudinary.config({ 
  cloud_name: 'dzpwwxuld', 
  api_key: '867811367686155', 
  api_secret: 'tLqP_fP20izz93D6Q2Mqcqaqb8c' 
});

// add artifact
const addArtifact = catchError (async(req,res)=>{

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
      req.body.imgCover = result.secure_url
      let doc = new artifactModel(req.body)
      await doc.save()
      res.json({message: 'success',doc})
     });
  })


// get all artifact
const getAllArtifacts = catchError( async(req,res) => {
  const artifacts = await artifactModel.find({})
  res.json({message:'success',artifacts})
})


// update artifact
const updateArtifact = async (req,res,next) => {
        await artifactModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.json({message:'success'})
}


// delete artifacts
const deleteArtifact = async (req,res,next) => {
        await artifactModel.findByIdAndDelete({_id:req.params.id})
        res.json({message:'success'})
}




export {
    addArtifact,
    getAllArtifacts,
    updateArtifact,
    deleteArtifact
}