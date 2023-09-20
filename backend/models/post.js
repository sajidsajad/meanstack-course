const mongoose = require('mongoose'); //import

//Schema blueprint
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

//to use this model outside of this file:
module.exports = mongoose.model('Post', postSchema); // model method gives us a constructor function that allows us to construct a JS object.