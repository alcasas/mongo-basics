const Model = require('../utils/model');
const mongoose = require('mongoose');

Model('movieDetails', (model)=>{
    let agg = model.aggregate();

    agg.match({rated:"R"});

    agg.project({
        _id: 1,
        actors: 1,
        rated: 1,
        year: 1,
        title: 1
    });

    agg.group({
        _id: {
            year: '$year',
            rated: '$rated'
        },
        movies: {
            $push: "$$ROOT"
        }
    });

    agg.unwind('movies');

    agg.lookup({
        from: 'movies',
        localField: 'movies.title',
        foreignField: 'title',
        as: 'movies.movie'
    })

    agg.project({
        'movies.year': 0
    });

    agg.group({
        _id: '$_id',
        movies: {
            $push: '$movies'
        },
        total : {
            $sum : 1
        }
    });

    agg.sort({
        _id: -1
    });

    agg.skip(0);
    agg.out('colExample')
    //agg.limit(2);

    agg.exec((err, data)=>{
        //there is no data if you use out stage
        console.log(JSON.stringify(data, null, 2));
        process.exit();
    });
});