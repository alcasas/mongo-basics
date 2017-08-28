const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://127.0.0.1:27017/test',{
        useMongoClient: true
    });

    mongoose.connection.once('open', ()=>{
        console.log('mongo connection opened');
    });

    mongoose.connection.on('error', (err)=>{
        console.log(`Error while trying to connect mongo instance: ${err}`);
        process.exit();
    });
    return mongoose.connection;
};