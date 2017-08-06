const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

// reads the environment variables from the .env file
require('dotenv').config(); // then call the config method on it

app.use(bodyParser.json()); // make the data available in the body of the request in our handlers.

let database

app.get('/api/contacts', (req, res) => {
  const contactsCollection = database.collection('contacts');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs) // send the database's data to res
  })
})

app.post('/api/contacts', (req, res) => {
  const user = req.body;

  const contactsCollection = database.collection('contacts');

  contactsCollection.insertOne(user, (err, r) => {
    if(err) {
      return res.status(500).json( { error: "Error inserting new record." } )
    }

    const newRecord = r.ops[0];

    return res.status(201).json(newRecord);
  })
})

// connect to MongoDB database
MongoClient.connect(process.env.DB_CONN, (err, db) => {
  console.log('## Connected to Mongodb...');

  app.listen(3000, () => {
    database = db;
    console.log('listening on port 3000...');
  })
});
