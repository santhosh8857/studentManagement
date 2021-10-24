var express = require("express");
var router = express.Router();
const { mongodb, MongoClient, dbUrl } = require("../library/dbConfig");

/* GET home page. */
router.get("/all-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("students").find().toArray();

    res.send({
      message: "Success",
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

// add students
router.post("/add-many-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("students").insertMany(req.body);

    res.send({ message: "Inserted!", details: data });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  }
});

// add student
router.post("/add-student", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("students").insertOne(req.body);

    res.send({ message: "Inserted!", details: data });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});
module.exports = router;
