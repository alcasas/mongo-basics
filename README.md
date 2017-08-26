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