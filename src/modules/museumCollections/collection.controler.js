import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../../middelwar/catchError.js';
import { collectiontModel } from '../../../databases/models/collectionModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
          
cloudinary.config({ 
  cloud_name: 'dzpwwxuld', 
  api_key: '867811367686155', 
  api_secret: 'tLqP_fP20izz93D6Q2Mqcqaqb8c' 
});

// add collection
const addCollection = catchError (async(req,res)=>{

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
      req.body.imgCover = result.secure_url
      let collection = new collectiontModel(req.body)
      await collection.save()
      res.json({message: 'success',collection})
     });
  })


// get all collections
const getAllCollections = catchError( async(req,res) => {
  let apiFeatures = new ApiFeatures(collectiontModel.find(),req.query)
  .pagination().search()

   let collections = await apiFeatures.mongooseQuery;
   res.json({ massage: "success",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, collections });
})

// get single collection
const getSingleCollection = catchError( async(req,res) => {
  const collection = await collectiontModel.findById(req.params.id)
  res.json({message:'success',collection})
})


// update collection
const updateCollection = catchError(async (req,res,next) => {
  await collectiontModel.findByIdAndUpdate({_id:req.params.id},req.body)
  res.json({message:'success'})
})


// delete collection
const deleteCollection = catchError(async (req,res,next) => {
  await collectiontModel.findByIdAndDelete({_id:req.params.id})
  res.json({message:'success'})
})


export {
  addCollection,
  getAllCollections,
  getSingleCollection,
  updateCollection,
  deleteCollection
}