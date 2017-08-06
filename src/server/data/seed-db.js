require('dotenv').config(); // get database from '.env'

const users = require('./users');
const contacts = require('./contacts');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords){
  MongoClient.connect(process.env.DB_CONN, (err, db) => { // Connect to database
    console.log('Connected to mongodb... ');

    const collection = db.collection(collectionName); // get reference of collections

    collection.remove();

    initialRecords.forEach((item) => {
      if(item.password){
        item.password = bcrypt.hashSync(item.password, 10);
        // if there are any passwords associated with the initial records that we want to insert, we hash them.
      }
    });

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} records inserted.`);
      console.log('closing connection... ');
      db.close();
      console.log('DONE!');
    });

  })
}

seedCollection("users", users);
seedCollection("contacts",contacts);
