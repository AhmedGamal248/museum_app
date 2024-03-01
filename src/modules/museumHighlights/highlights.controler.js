import {highlightModel } from '../../../databases/models/highlightModel.js'
import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../../middelwar/catchError.js';
          
cloudinary.config({ 
  cloud_name: 'dzpwwxuld', 
  api_key: '867811367686155', 
  api_secret: 'tLqP_fP20izz93D6Q2Mqcqaqb8c' 
});

// add highlight
const addHighlight = catchError (async(req,res)=>{

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
      req.body.imgCover = result.secure_url
      let highlight = new highlightModel(req.body)
      await highlight.save()
      res.json({message: 'success',highlight})
     });
  })


// get all Highlights
const getAllHighlights = catchError( async(req,res) => {
  const highlights = await highlightModel.find({})
  res.json({message:'success',highlights})
})

// get single Highlights
const getSingleHighlight = catchError( async(req,res) => {
  const highlight = await highlightModel.findById(req.params.id)
  res.json({message:'success',highlight})
})


// update Highlight
const updateHighlight = async (req,res,next) => {
        const highlight = await highlightModel.findByIdAndUpdate(req.params.id,req.body)
        res.json({message:'success',highlight})
}


// delete Highlight
const deleteHighlight = async (req,res,next) => {
        await highlightModel.findByIdAndDelete({_id:req.params.id})
        res.json({message:'success'})
}




export {
  addHighlight,
  getAllHighlights,
  getSingleHighlight,
  updateHighlight,
  deleteHighlight
}