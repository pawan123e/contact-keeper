const express = require('express');
const app = express();
const errorController = require('./controller/errorController')
const AppError = require('./utils/AppError')

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/contacts', require('./routes/contactRoutes'))


app.all('*', (req, res, next) =>{
    next(new AppError('You are accesing wrong route', 404));
})

app.use(errorController);
module.exports = app;