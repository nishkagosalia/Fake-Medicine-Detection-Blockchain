const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
var crypto = require('crypto');

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
      res.send({result:"success",designation:userDetails.designation,name:userDetails.firstName})
      console.log(userDetails.firstName)
    }) 
  }
  else{
    console.log("Login Failed");
    app.get('/login',(req,res) => {
      res.send({result:"failed"})
    })
  }
};


// fastlogin endpoint maybe

app.get('/optimizelogin',async(req,res)=>{
  const query = {userName:{$ne : null}};
  const options = {projection:{firstName:1,designation:1,userName:1,password:1}};
  const loginres = await client.db("PharmaChain").collection("LoginReg").find(query,options);
  if((await loginres.count())===0){
    console.log("No users are found");
  }
  else{
  const loginarray = [];
  await loginres.forEach(function(logindata){
    loginarray.push(logindata.userName, logindata.password,logindata.designation,logindata.firstName);
    console.log(logindata);
  });
  console.log(loginarray);
  res.send(loginarray);
  }
})




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
  else if(designationValue=="Block"){
    console.log("will find now from db")
    let currentId = await client.db("PharmaChain").collection("CountDB").findOne({Designation:"Block"});
    let blockCount = currentId.Count;
    return blockCount;
  }
}

async function findLatestMedCount(){
  let medcount = await client.db("PharmaChain").collection("CountDB").findOne({Designation:"Medicine"});
  let latestmedcount = medcount.Count;
  console.log(latestmedcount);
  return latestmedcount;
}

// qr string hash 
function hashForQR(transactionHash,blockHash){
  var qrstring=transactionHash+blockHash
  const hash = crypto.createHash('sha256').update(qrstring).digest('hex')
  return hash
}

// post function for recieving information from React for login purpose 
router.post('/hello',async (req,res)=>{
  var username=req.body.username
  var password=req.body.password
  console.log("checking for login")
  try {
    await loginUser(username,password)
  }
  catch{

  }
})

// register endpoint

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


// add medicine to medicineDB
router.post('/addMeds',async(req,res) => {
  console.log("entered add meds end point");
  var medicineName = req.body.medicineName;
  var expiryDate = req.body.expiryDate;
  var userName = req.body.userName;
  var cost = req.body.cost;
  var medLatestCount = await findLatestMedCount();
  var productId = "MED"+(medLatestCount+1);


  await client.db("PharmaChain").collection("MedicineDB").insertOne({
    medicineName:medicineName,
    expiryDate:expiryDate,
    userName:"Tejanshu",
    cost:cost,
    productId:productId
  }).then(console.log("Pushed into LoginReg DB")) 
})


// Find all orders placed by specified manufacturer and which are pending 
router.post('/getmanorders',async(req,res)=>{

  const query = {status:"pending",sellerName:"Tejanshu"};
  const options = {projection:{}};
  const details = await client.db("PharmaChain").collection("OrderDB").find(query);
  if ((await details.count()) === 0){
    console.log("No Documents were found in ordereDB !!");
  }
  else{
    const arr=[]
    const allorders = await details.forEach(function(myDoc) { arr.push({buyerName:myDoc.buyerName,medicineName:myDoc.medicineName,unit:myDoc.unit,cost:myDoc.cost}) });
    console.log(arr)
    app.get('/sendmanorders', (req,res) => {
      res.send(arr)
    }) 
    
  }
  
})

//get medicine list
app.get('/medslist', async(req,res) =>{
  const query = {ManufacturerName:"Tejanshu"};
  const options = {projection:{_id:0,medicineName:1}};
  const cursorMedsList = await client.db("PharmaChain").collection("MedicineDB").find(query,options);
  if ((await cursorMedsList.count()) === 0){
    console.log("No Documents were found in medicineDB !!");
  }
  else{
    const medslistarray = [];
    await cursorMedsList.forEach(function(medslist){medslistarray.push(medslist.medicineName)});
    res.send(medslistarray);
    console.log(medslistarray);
    console.log("data sent to react");
  }
})

// get all medicine data

app.get('/getAllMedsDB',async(req,res)=>{
  const query = {cost:{$gt:0}}
  const options = {projection:{_id:0,medicineName:1,cost:1,ManufacturerName:1}}
  const getAllMeds = await client.db("PharmaChain").collection("MedicineDB").find(query,options);
  if((await getAllMeds.count())===0){
    console.log("No medicines are found");
  }
  else{
    const allMeds = [];
    await getAllMeds.forEach(function(getAllMeds){
      allMeds.push(getAllMeds.medicineName,getAllMeds.cost,getAllMeds.ManufacturerName);
    });
    console.log("all meds in node",allMeds);
    res.send(allMeds);
  }
})

// retailer place order

router.post('/placeMedsOrder',async(req,res)=>{

  
  var sellerName = req.body.sellerName;
  var buyerName = req.body.buyerName;
  var medicineName = req.body.medicineName;
  var unit = req.body.unit;
  var cost = req.body.cost;
  var totalCost = cost*unit;
  var status = "pending";
  console.log("entered add meds end point",unit,cost);
  console.log("total cost is not nan?",totalCost);


  await client.db("PharmaChain").collection("OrderDB").insertOne({
    sellerName:sellerName,
    buyerName:buyerName,
    medicineName:medicineName,
    unit:unit,
    cost:cost,
    totalCost:totalCost,
    status:status
  }).then(console.log("Pushed into Order DB")) 
  
})




// push to transactionDb 
router.post('/pushtoTransactionDb',async(req,res)=>{
  var medname=req.body.medicineName
  var buyer=req.body.buyerName
  var cost=req.body.cost  
  var unit=req.body.unit
  var name=req.body.firstName
  const currentId = await findCurrentId("Block");
  var blockid = "B"+(currentId+1);
  var totalcost= parseInt(unit)*parseInt(cost)
  fs.readFile('output.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    else{
      const noSpecialCharacters = data.replace(/[^\w ]/g, '');
      console.log(noSpecialCharacters)
      const transHash=noSpecialCharacters.search('transactionHash')
      const blHash=noSpecialCharacters.search('blockHash')
      const transactionHash=noSpecialCharacters.substring((transHash+16),(transHash+16+66))
      const blockHash=noSpecialCharacters.substring((blHash+10),(blHash+10+66))
      
      client.db("PharmaChain").collection("TransactionDB").insertOne({
        medicineName:medname,
        buyerName:buyer,
        sellerName:name,
        blockId:blockid,
        cost:cost,
        unit:unit,
        transactionHash:transactionHash,
        totalcost:totalcost

      }).then(console.log("Pushed into Transaction DB")) 

      const qrHash=hashForQR(transactionHash,blockHash)
      client.db("PharmaChain").collection("BlockChainDB").insertOne({
        blockId:blockid,
        blockHash:blockHash,
        transactionHash:transactionHash,
        qrHash:qrHash

      }).then(console.log("Pushed into Block DB")) 

    }
  });
})
// confirm the order has been placed 
router.post('/confirmorder',async(req,res)=>{
  var medname=req.body.medicineName
  var buyer=req.body.buyerName
  const filter = { buyerName: buyer, medicineName: medname };
  const updateDoc = {
    $set: {
      status: 'confirm'
    },
  };

  await client.db("PharmaChain").collection("OrderDB").updateOne(filter,updateDoc);

})