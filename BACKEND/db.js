const mongoose = require('mongoose')  // Mongoose return promise 
const mongoToUri = "mongodb://0.0.0.0:27017/iNotebook";
const connectToMongo = () => {
    mongoose.connect(mongoToUri).then(() => {
        console.log("connected to mongo successfuly");       // We can use async/await, if dont want use callback function    
    }).catch((e) => {
        console.log(e)
    })
}
module.exports = connectToMongo