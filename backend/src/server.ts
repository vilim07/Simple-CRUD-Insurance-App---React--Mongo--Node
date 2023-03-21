import * as dotenv from "dotenv";
import express from "express";
import usersRoutes from "./routes/users";
import mongoose from "mongoose";

dotenv.config()

const app = express()


// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use('/api/users', usersRoutes)

// CONNECT DB

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        // LISTEN REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('DB connection established & listening to port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error);
    })



