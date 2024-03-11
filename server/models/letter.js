const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const letterSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    letter: { type: String, required: true },
    isApproved: { type: Boolean }
});

module.exports = mongoose.model('Letter', letterSchema);