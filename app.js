const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose =require('mongoose')

const app = express()

const authRoute = require('./routes/authRoute')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//use routes

app.use('/api',authRoute)

mongoose.connect('mongodb+srv://azdhebar:azdhebar@cluster0.4e48x.mongodb.net/jchat?retryWrites=true&w=majority',{

useCreateIndex:true,
useUnifiedTopology:true,
useFindAndModify:true,
useNewUrlParser:true
}).then(
    ()=>{
        console.log("DB connected")
    },
    (err)=>{
        console.log(err)
    }

)


app.listen(8000,()=>{
    console.log("server run at port number 8000")
})