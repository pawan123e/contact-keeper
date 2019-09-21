const express = require('express');
const app = express();
const errorController = require('./controller/errorController')
const AppError = require('./utils/AppError')
const path = require('path')

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/contacts', require('./routes/contactRoutes'))


// app.all('*', (req, res, next) =>{
//     next(new AppError('You are accesing wrong route', 404));
// })

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.use(errorController);
module.exports = app;