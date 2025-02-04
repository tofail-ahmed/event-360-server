require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port =5000;

// Middleware
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "https://event360-client-iota.vercel.app",
//   ],
  
// };
const corsOptions = {
  origin:"*"
};

app.use(cors(corsOptions));

app.use(express.json());

// MongoDB setup
const uri =
  `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.zhsy6ko.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();

    // Access MongoDB collections after successful connection
    const servicesCollection = client.db("event360").collection("service");
    const eventsCollection = client.db("event360").collection("event");
    const reviewsCollection = client.db("event360").collection("review");
    const galleriesCollection = client.db("event360").collection("gallery");
    const recentEventsCollection = client
      .db("event360")
      .collection("recentEvent");


      ///service api-------------
    app.post("/service", async (req, res) => {
      const { service, description, image, features } = req.body;

      const newService = {
        service,
        description,
        image,
        features,
      };
      console.log(newService);
      const result = await servicesCollection.insertOne(newService);
      res.send(newService);
    });

    app.get("/services", async (req, res) => {
      const allService = await servicesCollection.find().toArray();
      res.send(allService);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;

      const result = await servicesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.put("/services/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const { service, description, image, features } = body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          service,
          description,
          image,
          features,
        },
      };
      const result = await servicesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    ///eventItem api------------------
    app.post("/eventItem", async (req, res) => {
      const { eventItem, description, image, features } = req.body;
      const newEvent = {
        eventItem,
        description,
        image,
        features,
      };
      console.log(newEvent);
      const result = await eventsCollection.insertOne(newEvent);
      res.send(newEvent);
    });

    app.get("/eventItems", async (req, res) => {
      const allEvents = await eventsCollection.find().toArray();
      res.send(allEvents);
    });
    app.get("/eventItems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventsCollection.findOne(query);
      res.send(result);
    });
    app.delete("/eventItems/:id", async (req, res) => {
      const id = req.params.id;

      const result = await eventsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.put("/eventItems/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const { eventItem, description, image, features } = body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          eventItem,
          description,
          image,
          features,
        },
      };
      const result = await eventsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    ///RecentEvent-----------------

    app.get("/recents/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recentEventsCollection.findOne(query);
      res.send(result);
    });
    app.get("/recents", async (req, res) => {
      const allrecents = await recentEventsCollection.find().toArray();
      res.send(allrecents);
    });
    app.delete("/recents/:id", async (req, res) => {
      const id = req.params.id;

      const result = await recentEventsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.post("/recent", async (req, res) => {
      const { eventItem, description, image, features } = req.body;
      const newEvent = {
        eventItem,
        description,
        image,
        features,
      };
      console.log(newEvent);
      const result = await recentEventsCollection.insertOne(newEvent);
      res.send(result);
    });
///review api---------------------

app.get("/reviews",async(req,res)=>{
  const result= await reviewsCollection.find().toArray();
res.send(result)
})
app.delete("/reviews/:id", async (req, res) => {
  const id = req.params.id;

  const result = await reviewsCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
});
app.post("/review", async (req, res) => {
  const { name, designation, image, review } = req.body;
  const newReview = {
    name, designation, image, review 
  };
  console.log(newReview);
  const result = await reviewsCollection.insertOne(newReview);
  res.send(result);
});

//gllery------------

app.get("/galleries", async (req, res) => {
  const allrecents = await galleriesCollection.find().toArray();
  res.send(allrecents);
});
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensure that the client will close when you finish/error
    // Note: It's better to keep the connection open while your app is running
    // and close it only when your app is shutting down.
    // await client.close();
  }
}

// Call the run function to establish the MongoDB connection
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send(`Event 360 is running on ${port} updated at 3/24/24`);
});

app.listen(port, () => {
  console.log(`Event 360 is running on ${port}`);
});
