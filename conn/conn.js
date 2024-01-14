const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DB connected successfully')
  } catch (err) {
    console.error(err)
    throw new Error('Error in DB connection')
  }
}

connection()
