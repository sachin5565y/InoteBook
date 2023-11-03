const mongoose = require('mongoose')  // Mongoose return promise 
const mongoToUri = "mongodb+srv://sachin5565y:8Gz2uZAJp1pjVqKx@cluster0.kxasuho.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = () => {
    mongoose.connect(mongoToUri).then(() => {
        console.log("connected to mongo successfuly");       // We can use async/await, if dont want use callback function    
    }).catch((e) => {
        console.log(e)
    })
}
module.exports = connectToMongo