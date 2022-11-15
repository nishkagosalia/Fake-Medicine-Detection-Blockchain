// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running at http://${hostname}:${port}/`);
})

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://NishkaGosalia:shimla123@blockchaincluster.sqmijcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        await listDatabases(client);
        await findMedDetailsBasedOnName(client,"Dolo650")
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findMedDetailsBasedOnName(client,medname){
  const result=await client.db("PharmaChain").collection("MedicineDB").findOne({medicineName:medname})
  if (result) {
    console.log(`Found a listing in the collection with the name '${medname}':`);
    console.log(result);
    console.log(result.cost)
} else {
    console.log(`No listings found with the name '${medname}'`);
}
}

run().catch(console.dir);