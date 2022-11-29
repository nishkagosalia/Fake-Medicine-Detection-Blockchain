import MetaCoin from '../fakeMedDetection/contractsOnly/MetaCoin.json';
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running at http://${hostname}:${port}/`);
})

// blockchain
// const Web3 = require('web3');
// const web3 = new Web3("http://localhost:8545");
// console.log(web3.eth.getAccounts());





// database connection
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
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const networkID = await web3.eth.net.getId();
  const deployedNetwork = MetaCoin.networks[networkID];
  const instance = new web3.eth.Contract(
    MetaCoin.abi,
    deployedNetwork && deployedNetwork.address,
  );

  




  // database retrieval
  const userDetails = await client.db("PharmaChain").collection("LoginReg").findOne({userName:username, password:password})
  if (userDetails.userName == username && userDetails.password == password){
    console.log("Login successful");
    app.get('/login', (req,res) => {
      res.send({userName:username, password:password})
      // var Web3 = require('web3');
      // var url ='HTTP://0.0.0.0:8545';
      // var web3 = new Web3(url);
      // web3.eth.getAccounts(console.log);

      // var Accounts = require('web3-eth-accounts');
      // var Web3 = new Accounts('HTTP://0.0.0.0:8545');
      // Web3.eth.getAccounts(console.log);

      
      // const ganache = require("ganache");
      // const options = {};
      // const server = ganache.server(options);
      // const PORT = 8545;
      // server.listen(PORT, async err => {
      //   if(err) throw err;
      //   console.log('ganache is listening on port ${PORT}...');
      //   const provider = server.provider;
      //   const accounts = await provider.request(
      //     {
      //       method: "eth_accounts",
      //       params:[]
      //     }
      //   );
      //   console.log(accounts);
      // });


      



      // const web3 = new Web3(ganache.provider());

      
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