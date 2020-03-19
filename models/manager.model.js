var mongoose = require('mongoose');
var managaerSchema = new mongoose.Schema({
name : String,
age : Number,
depart : String,
sal : Number
})

module.exports = mongoose.model('Manager',managaerSchema)