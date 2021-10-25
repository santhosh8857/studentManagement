var express = require("express");
var router = express.Router();
var { ObjectId } = require("mongodb"); // to use ObjectId
const { mongodb, MongoClient, dbUrl } = require("../dbConfig");
const { hashing, hashCompare } = require("../library/auth"); // imported to make the password encrypted

/* GET users listing. */
router.get("/", async (req, res) => {
  // since it is returning promise need to use await
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const data = await db.collection("users").find().toArray();

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

// register
router.post("/register", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const hash = await hashing(req.body.password); // calling hashing function to encrypt the req password
    req.body.password = hash; // assigning encrypted password
    // console.log(hash);

    const db = client.db("studentManagement");
    const data = await db.collection("users").insertOne(req.body);

    res.send({ message: "Account Created!" });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in conenction" });
  } finally {
    client.close();
  }
});

// login
router.post("/login", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db("studentManagement");
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email }); // to get the req user details
    console.log(user);
    if (user) {
      // checking the availability of the user
      const compare = await hashCompare(req.body.password, user.password); // calling compare fucntion to check the req password and hashed password in db

      // based on the result from compare function - validating password
      if (compare === true) {
        res.send({ message: "Login successful" });
      } else {
        res.send({ message: "Invalid password or email" });
      }
    } else {
      res.send({ message: "No user available" });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

module.exports = router;
