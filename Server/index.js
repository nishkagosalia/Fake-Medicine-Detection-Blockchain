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
// textvariable = {
//   'tejanshu':'nishka'
// }

// app.get('/', (req, res) => {
//   res.send(textvariable)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running at http://${hostname}:${port}/`);
})

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://TejanshuMistry:manali123@blockchaincluster.sqmijcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        await listDatabases(client);
        await findMedDetailsBasedOnName(client,"Dolo650")
        await loginUser("Teju2001","manali123")
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


app.get('/', (req, res) => {
  res.send(result)
})
}


// try to create a login endpoint
// the end point will be /login

async function loginUser(username, password){
  const userDetails = await client.db("PharmaChain").collection("LoginReg").findOne({userName:username, password:password})
  if (userDetails.userName == username && userDetails.password == password){
    console.log("Login successful");
    app.get('/login', (req,res) => {
      res.send({userName:username, password:password})
    }) 
  }
  else{
    console.log("Login Failed");
    app.get('/login',(req,res) => {
      res.send("Login failed")
    })
  }
}

run().catch(console.dir);