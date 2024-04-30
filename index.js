const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
//Require('Dotenv').Config();
const port = process.env.PORT || 5000;

// middleware
app.use (cors(
  {origin:["http://localhost:5173",
  "https://destination-unknown-ed9f8.firebaseapp.com","https://destination-unknown-ed9f8.web.app"]}));
//app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bkwszd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const touristSpotCollection = client.db('touristSpotDB').collection('touristSpot');
    const countriesCollection = client.db('touristSpotDB').collection('countries');

    app.get('/countries', async(req, res) => {
      const cursor = countriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);

   })


    app.get('/tourist-spots', async(req, res) => {
       const cursor = touristSpotCollection.find();
       const result = await cursor.toArray();
       res.send(result);

    })

    app.post('/tourist-spot', async(req,res) => {
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristSpotCollection.insertOne(newTouristSpot);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})