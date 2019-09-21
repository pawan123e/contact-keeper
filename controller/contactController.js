const Contact = require('../models/Contact')
const AsyncError = require('../utils/asyncError')

exports.getContacts = AsyncError(async (req, res, next) =>{
   const contacts = await Contact.find({user: req.user.id})
   .sort({date: -1});
   res.json({
       status: 'success',
       contacts
   })
})

exports.createContact = AsyncError(async (req, res, next) =>{
      if(!req.body.user) req.body.user = req.user.id;
      const contact = await Contact.create(req.body);
      res.json({
          status: 'success',
          contact
      })
})

exports.deleteContact = AsyncError(async (req, res, next) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({
        status: 'success'
    })
})

exports.updateContact = AsyncError(async (req, res, next) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'success'
    })
})