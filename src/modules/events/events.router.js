import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import {addEventt, deleteEvent, getAllEvents, getSingleEvent, updateEvent} from './events.controler.js'
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';

const eventRouter = express.Router();

//add event
eventRouter.post('/events',fileUpload('imgCover'),addEventt)

//getAll events
eventRouter.get('/events',getAllEvents)

// get singel event data
eventRouter.get('/events/:id',validation(paramsIdVal),getSingleEvent)

// update event
eventRouter.put('/events/:id',updateEvent)

// delete event
eventRouter.delete('/events/:id',deleteEvent)

export {
    eventRouter
}