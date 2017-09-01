const Model = require('../utils/model');
const mongoose = require('mongoose');

Model('movieDetails', (model)=>{
    let agg = model.aggregate();

    //agg.match({year:2014});
    agg.unwind('actors');

    agg.sort({'actors':-1});

    agg.project({
        _id: 1,
        actor: '$actors',
        year: 1
    });

    agg.group({
        _id: '$year',
        actors: {
            $addToSet: '$actor'
        }
    });

    agg.exec((err, data)=>{
        console.log(JSON.stringify(data, null, 2));
        process.exit();
    });
});