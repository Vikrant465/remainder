require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb+srv://vikrant:admin@cluster0.0hxxray.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParseR:true ,
    useUnifiedTopology:true
},).then(()=>console.log('DB connected'))
.catch((err)=> {console.error(err);});

const reminderSchema = new mongoose.Schema({
    reminderMsg : String,
    reminderAt : String,
    isReminded : Boolean
})

const Reminder = new mongoose.model("reminder", reminderSchema)

app.get("/getAllReminder", async (req,res)=>{
    try {
        const data=  await Reminder.find({})
        res.json (data)    
    } catch (error) {
        res.json(error) 
    }
})


app.post("/addReminder",async (req,res) =>{
    console.log(req.body)
    const { reminderMsg,remindAt} = req.body
    await Reminder.create({
        reminderMsg,
        reminderAt:remindAt,
        isReminded:false
    })
    const data =  await Reminder.find({})
    res.json (data)
    
})

app.post("/deleteReminder",async (req,res) =>{
    await Reminder.deleteOne({_id: req.body.id})
    const data =  await Reminder.find({})
    res.json (data)
})
app.get("/", async (req,res)=>{
    // const data =  await Reminder.find({})
    // res.json (data)
    const data =  await Reminder.find({})
    res.json(data)
})


app.listen( 9000 , ()=> console.log("Be started "))

