const mongoose = require('mongoose')

const connection = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log('DB connected successfully')
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    res.status(400).send('error in db connection')
  }
}

connection()
