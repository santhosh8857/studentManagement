var express = require("express");
var router = express.Router();
var { ObjectId } = require("mongodb");
const { mongodb, MongoClient, dbUrl } = require("../library/dbConfig");

/* GET home page. */
router.get("/all-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("students").find().toArray();

    res.send({
      message: "Success",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

// get specific studnet
router.get("/get-student/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    let data = await db
      .collection("students")
      .findOne({ _id: ObjectId(req.params.id) });

    res.send({
      message: "Success",
      data: data,
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
  } finally {
    client.close();
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

// edit student
router.put("/edit-student/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("students").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          class: req.body.class,
        },
      }
    );

    res.send({
      message: "Updated",
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

// delete user
router.delete("/delete-user/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db
      .collection("students")
      .deleteOne({ _id: ObjectId(req.params.id) });

    res.send({
      message: "Deleted!",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});
module.exports = router;
