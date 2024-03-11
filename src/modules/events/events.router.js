import express from 'express'
import { fileUpload } from '../../fileUpload/uploads.js';
import {addEventt, deleteEvent, getAllEvents, getSingleEvent, updateEvent} from './events.controler.js'
import { paramsIdVal } from '../user/user.validation.js';
import { validation } from '../../middelwar/validation.js';
import { allowedTo, protectedRoutes } from '../user/user.controler.js';

const eventRouter = express.Router();

//add event
eventRouter.post('/events',protectedRoutes,allowedTo('user','admin'),fileUpload('imgCover'),addEventt)

//getAll events
eventRouter.get('/events',protectedRoutes,allowedTo('user','admin'),getAllEvents)

// get singel event data
eventRouter.get('/events/:id',protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),getSingleEvent)

// update event
eventRouter.put('/events/:id',protectedRoutes,allowedTo('user','admin'),updateEvent)

// delete event
eventRouter.delete('/events/:id',protectedRoutes,allowedTo('user','admin'),deleteEvent)

export {
    eventRouter
}