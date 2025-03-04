const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://skeetercathcart:WdLC0KSZdjhsuksz@osrs-data.jy6mh.mongodb.net/?retryWrites=true&w=majority&appName=OSRS-Data")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB