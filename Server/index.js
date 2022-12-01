const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const bodyParser = require("body-parser");
const router= express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running at http://${hostname}:${port}/`);
})

app.use('/',router)



// database connection
const { MongoClient, ServerHeartbeatStartedEvent } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://TejanshuMistry:manali123@blockchaincluster.sqmijcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect()
console.log("Connected correctly to server");

// async function findMedDetailsBasedOnName(client,medname){
//   const result=await client.db("PharmaChain").collection("MedicineDB").findOne({medicineName:medname})
//   if (result) {
//     console.log(`Found a listing in the collection with the name '${medname}':`);
//     console.log(result);
//     console.log(result.cost)
// } else {
//     console.log(`No listings found with the name '${medname}'`);
// }
// app.get('/', (req, res) => {
//   res.send(result)
// })
// }

async function loginUser(username, password){
  // database retrieval
  const userDetails = await client.db("PharmaChain").collection("LoginReg").findOne({userName:username, password:password})
  if (userDetails!=null && userDetails.userName == username && userDetails.password == password){
    console.log("Login successful");
    app.get('/login', (req,res) => {
      res.send({result:"success",designation:userDetails.designation})
    }) 
  }
  else{
    console.log("Login Failed");
    app.get('/login',(req,res) => {
      res.send({result:"failed"})
    })
  }
}



router.post('/hello',async (req,res)=>{
  var username=req.body.username
  var password=req.body.password
  try {
    await loginUser(username,password)
  }
  catch{

  }
})

// run().catch(console.dir);