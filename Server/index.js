const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/",router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running at http://${hostname}:${port}/`);
})

// database connection
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://TejanshuMistry:manali123@blockchaincluster.sqmijcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect()
console.log("Connected correctly to server");








// login for mongo  //async function
async function loginUser(username, password){
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
};

// find currentID function  //async

async function findCurrentId(designationValue){
  if(designationValue=="Manufacturer"){
    console.log("will find now from db")
    let currentId = await client.db("PharmaChain").collection("CountDB").findOne({Designation:"Manufacturer"});
    let manCount = currentId.Count;
    return manCount;
  }
  else if(designationValue=="Retailer"){
    console.log("will find now from db")
    let currentId = await client.db("PharmaChain").collection("CountDB").findOne({Designation:"Retailer"});
    let retCount = currentId.Count;
    return retCount;
  }
  else if(designationValue=="Customer"){
    console.log("will find now from db")
    let currentId = await client.db("PharmaChain").collection("CountDB").findOne({Designation:"Customer"});
    let custCount = currentId.Count;
    return custCount;
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

router.post('/register',async(req,res) => {

  var userName = req.body.userName;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;
  var designationValue = req.body.designationValue;
  var city = req.body.city;
  var blockchainAccountId = "0x755fcD76091430d653c4DA5CEDFdE6479Bc47d08";

  if(designationValue == "Manufacturer"){
    const currentId = await findCurrentId(designationValue);
    var userId = "M"+(currentId+1);
  }
  else if(designationValue == "Retailer"){
    const currentId = await findCurrentId(designationValue);
    var userId = "R"+(currentId+1);
  }
  else if(designationValue == "Consumer"){
    const currentId = await findCurrentId(designationValue);
    var userId = "C"+(currentId+1);
  }

  await client.db("PharmaChain").collection("LoginReg").insertOne({
    firstName:firstName,
    blockchainAccountId:blockchainAccountId,
    city:city,
    designation:designationValue,
    lastName:lastName,
    userId:userId,
    userName:userName,
    password:password
  }).then(console.log("Pushed into LoginReg DB")) 
})






// run().catch(console.dir);