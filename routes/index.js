var express = require("express"); // responsible for express package
var router = express.Router();
var { ObjectId } = require("mongodb"); // to use ObjectId
const { mongodb, MongoClient, dbUrl } = require("../dbConfig"); // importing

/* GET home page. */
router.get("/all-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl); // connecting to mongodb

  try {
    const db = client.db("studentManagement"); // connecting to db
    const data = await db.collection("students").find().toArray(); // operation in db collection

    // sending response from server
    res.send({
      message: "Success",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" }); // response from server incase of error
  } finally {
    client.close(); // close the connection
  }
});

// get specific studnet
router.get("/get-student/:id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    let data = await db
      .collection("students")
      .findOne({ _id: ObjectId(req.params.id) }); // params.id to get the id from req url

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
      // updateOne(filter(data), operation ($set))
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
