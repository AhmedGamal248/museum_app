import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../../middelwar/catchError.js';
import { eventsModel } from '../../../databases/models/eventsModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
          
cloudinary.config({ 
  cloud_name: 'dzpwwxuld', 
  api_key: '867811367686155', 
  api_secret: 'tLqP_fP20izz93D6Q2Mqcqaqb8c' 
});

// add event
const addEventt = catchError (async(req,res)=>{

  cloudinary.uploader.upload(req.file.path, async (error, result) => {
      req.body.imgCover = result.secure_url
      let event = new eventsModel(req.body)
      await event.save()
      res.json({message: 'success',event})
     });
  })


// get all events
const getAllEvents = catchError( async(req,res) => {
  let apiFeatures = new ApiFeatures(eventsModel.find(),req.query)
  .pagination().search()

   let events = await apiFeatures.mongooseQuery;
   res.json({ massage: "success",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, events });
})

// get single event data
const getSingleEvent = catchError(async(req,res) => {
  const event = await eventsModel.findById(req.params.id)
  res.json({message:'success',event})
})


// update event
const updateEvent = async (req,res,next) => {
        const event = await eventsModel.findByIdAndUpdate(req.params.id,req.body)
        res.json({message:'success',event})
}


// delete event
const deleteEvent = async (req,res,next) => {
        await eventsModel.findByIdAndDelete({_id:req.params.id})
        res.json({message:'success'})
}




export {
  addEventt,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent
}