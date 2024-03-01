process.on('uncaughtException',(err)=> {
    console.log(err)
})

import express from 'express'
import { DBconnection } from './databases/DB_connection.js'
import { userRouter } from './src/modules/user/user.router.js'
import { appError } from './src/utils/appError.js'
import cors from 'cors'
import { highlightRouter } from './src/modules/museumHighlights/highlights.router.js'
import { collectionRouter } from './src/modules/museumCollections/collection.router.js'
import { eventRouter } from './src/modules/events/events.router.js'
import { workShopRouter } from './src/modules/workShops/workShops.router.js'

const app = express()
const port = 3000


app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use(userRouter)
app.use(highlightRouter)
app.use(collectionRouter)
app.use(eventRouter)
app.use(workShopRouter)

app.get('/',(req,res)=>{res.json({message:'hello hello'})})

DBconnection()

app.use('*',(req,res,next)=> {
    next(new appError(`can not get this padge ${req.originalUrl}`,404))
})

process.on('unhandledRejection',(err)=>{
    console.log(err)
})

app.listen(process.env.PORT||port, () =>{
    console.log(`Server is running  on port ${port}...!`)
} )