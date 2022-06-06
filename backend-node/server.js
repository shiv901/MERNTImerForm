const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");

const app = express()

app.use(cors())
// parse application/json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

connectDB()

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  ccode: String,
  phone: String,
  captcha: String
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
  res.send('Server working')
})
app.post('/store-data', async (req, res) => {
  // console.log('In server.js Response: ' + JSON.stringify(req.body))
  const { name, email, address, ccode, phone, captcha } = req.body
  const user = await User.create({name, email, address, ccode, phone, captcha})
  
  if(user) {
    res.status(201).json({
      _id: user.id, 
      name: user.name,
      email: user.email,
      address: user.address,
      ccode: user.ccode,
      phone: user.phone,
      captcha: user.captcha
    })
  } else{
    res.status(400)
    throw new Error('Invalid user data')
  }
})

app.listen(5000, console.log('Server Started on Port: 5000'))
