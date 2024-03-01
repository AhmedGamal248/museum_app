import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../../middelwar/catchError.js';
import { workShopModel } from '../../../databases/models/workShopsModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
          
cloudinary.config({ 
  cloud_name: 'dzpwwxuld', 
  api_key: '867811367686155', 
  api_secret: 'tLqP_fP20izz93D6Q2Mqcqaqb8c' 
});

// add workShop
const addWorkShop = catchError (async(req,res)=>{

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
      req.body.imgCover = result.secure_url
      let workShop = new workShopModel(req.body)
      await workShop.save()
      res.json({message: 'success',workShop})
     });
  })


// get all workShops
const getAllWorkShops = catchError( async(req,res) => {
  let apiFeatures = new ApiFeatures(workShopModel.find(),req.query)
  .pagination().search()

   let workShops = await apiFeatures.mongooseQuery;
   res.json({ massage: "success",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, workShops });
})

// get single workShop data
const getSingleWorkShop = catchError(async(req,res) => {
  const workShop = await workShopModel.findById(req.params.id)
  res.json({message:'success',workShop})
})


// update workShop
const updateWorkShop = async (req,res,next) => {
        const workShop = await workShopModel.findByIdAndUpdate(req.params.id,req.body)
        res.json({message:'success',workShop})
}


// delete workShop
const deleteWorkShop = async (req,res,next) => {
        await workShopModel.findByIdAndDelete({_id:req.params.id})
        res.json({message:'success'})
}




export {
  addWorkShop,
  getAllWorkShops,
  getSingleWorkShop,
  updateWorkShop,
  deleteWorkShop
}