const Model = require('../utils/model');
const mongoose = require('mongoose');

Model('movieDetails', (model)=>{
    let agg = model.aggregate();

    agg.match({year:2014});
    
    agg.exec((err, data)=>{
        console.log(data);
        process.exit();
    });
});