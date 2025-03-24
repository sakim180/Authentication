import express from 'express'
 import cors from 'cors'
 import 'dotenv/config'
 import cookieParser from 'cookie-parser'
 import connectdb from './config/mongodb.js'
 import userAuthRouter from './routes/userAuthRoutes.js'
import userRouter from './routes/userroutes.js'

const app=express()
 const PORT=process.env.PORT || 8000
connectdb();
 app.use(express.json())
 app.use(cors({credentials:true}))
 app.use(cookieParser())

app.use('/api/auth',userAuthRouter)
app.use('/api/',userRouter)


app.listen(PORT,()=>{
    console.log(`server running on :${PORT}`)
})

