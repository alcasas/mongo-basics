[Official mongodb documentation](https://docs.mongodb.com/manual/)

Run and connect mongodb server
------------------
Once you have mongodb installed you can run mongodb server with comand

    mongod
In some UNIX systems the folder `/data/db` must be creates or you can specify another folder to store mongodb databases.

    mongod --dbpath Documents/db
For more options you can run mongo options you can run 

    mongo -h

Once you have mongodb running then you can run `mongo` command in your terminal, by default you'll be connected to localhost using port 27017

    mongo
    mongo use databaseName
If you want to connect to a remote mongodb server then you have to specify host, port, user, password and database name.

    mongo <host>:<port>/<database> -u <dbuser> -p <dbpassword>
   eg:

    mongo ds159033.mlab.com:59033/example-db -u read-user -p securepsw

CRUD Operations
---------------
To insert you can specify a sinlge object or an array of objects, eg:

    db.collectionName.insert(document || document[]);
    db.collectionName.insertOne(domcument);
    db.collectionName.insertMany(document[]);
    db.collectionName.save(document);
To read a collection you can filter and project the find function, eg:

    db.collectionName.find(where, projection);
Projection is the set of field to include/exclude in the cursor

To update documents in a collection you can use the updates methods:

    db.collectionName.update(where, document || document[], options);
    db.collectionName.updateOne(where, document, options);
    db.collectionName.updateMany(where, document[], options);

Import and export
-----------------
To import data to mongodb you can user two different commands `mongorestore` and `mongoimport`.

`mongorestore` restores data exported with indexes and metadata, the restored data should be a result of `mongodump`

    mongorestore -d database folderName
    mongorestore -d database -collection collection file.bson
    mongorestore -h remoteServer -d database -u user -p password folderName
`mongoimport` creates or updates documents from json, csv or tsv files, a collection should be specified, no indexes and no metadata should be imported

    mongoimport -d database -c collectionName file.json
    mongoimport -h remoteServer -d database -c collection -u user -p password file.json

To export data from mongodb you can use `mongodump` and `mongoexport`.
`mongodump` will export all the data in the database including indexes and metadata

    mongodump -d database outputDir
    mongodump -d database -c collection outputDir
mongoexport exports only data from a collection

    mongoexport -d database -c collectionName file.json
    mongoexport -h remoteServer -d database -c collection -u user -p password file.json

Indexes
-------
Get indexes

    db.collectionName.getIndexes();
    db.movieDetails.getIndexes();

Simple index

    db.collectionName.createIndex(keys, options);
    db.movieDetails.createIndex({rated:1}, {sparse:1});
Compund index

    db.movieDetails.createIndex({"awards.nominations":1});

Multikey index

    db.movieDetails.createIndex({rated:1, metacritic: 1});
Text index:

    db.movies.createIndex( { title: "text" } );
    db.movieDetails.createIndex({title:"text", plot:"text", actors:"text"}, {weights: {title:10, actors:5}, name:"textIndex"})
    
    db.movieDetails.find({$text:{$search:"Leo"}}, {score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(5).pretty();
2d Spatial index

    db.collection.createIndex({location:"2d"});
    db.collection.find({location:{$near:[50, 50]}})

Delete index

    db.collectionName.dropIndex(indexName);

Covered queries

    db.movieDetails.explain("executionStats").find({rated:'PG',metacritic:'71'}, {_id:0});
