const connection = require('./connection');
const mongoose = require('mongoose');

module.exports = function(collection, cb){
    connection().once('open', ()=>{
        let schema = new mongoose.Schema({
            _id : mongoose.Schema.Types.ObjectId
        }, { collection: collection});
        let model = mongoose.model('Model', schema);
        cb(model);
    });
};
