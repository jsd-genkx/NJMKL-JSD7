import express from "express";

// this will help us connect to the database
import db from "../db/connection.js";

// this help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// we use it to define our routes.
// the router will be added
// as a middleware and will take control of requests
// starting with path -> /record.
const router = express.Router();

//----------------------------------------------------------------//
// setup apis endpoints using express router
// this router will get a list of all the records.
router.get("/", async (req, res) => {
  // mongodb query -> db.collection("records")
  // อันนี้ไม่ต้อง await เพราะเราไปชี้ collection "records" เฉยๆ
  let collection = db.collection("records");
  // mongodb query -> db.collection.find({})
  // อันนี้ส่งไปเอา documents ละ
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  console.log(results);
});

// this router will get a single record by id.
router.get("/:id", async (req, res) => {
  // mongodb query -> db.collection("records")
  let collection = db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  // mongodb query -> db.collection.findOne(query)
  let result = await collection.findOne(query);

  if (!result) {
    res.send("Not found").status(404);
  } else {
    res.send(result).status(200);
  }
});

// this router will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      motto: req.body.motto,
      position: req.body.position,
    };
    let collection = db.collection("records");
    let result = collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.send(500).send("Error adding record");
  }
});

// this router will update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        motto: req.body.motto,
        position: req.body.position,
      },
    };
    // mongodb query
    let collection = db.collection("records");
    // mongodb query
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    let result = await collection.deleteOne(query);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
