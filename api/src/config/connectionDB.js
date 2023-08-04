const mongoose = require('mongoose')

const paramsConnection = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// const URL = 'mongodb://127.0.0.1:27017/practice'
const URL = process.env.URL_DB_CONNECTION
mongoose.connect(URL, paramsConnection)
.then(()=>console.log('Database coneccted succesful'))
.catch((e)=>console.log('Error connectig DB: '+e))

module.exports = mongoose