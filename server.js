const dotenv = require('dotenv')
const app = require('./app')
const mongoose = require('mongoose');

dotenv.config({
    path: './config.env'
})

const DB = process.env.MONGO_URI

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to the database successfully...'))
.catch((err) => console.log('Error occured ', err))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`The server connected to the port ${PORT}`))