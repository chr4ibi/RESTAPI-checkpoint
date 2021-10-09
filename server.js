// Libraries imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Model imports
const userModel = require("./src/models/user");

const app = express();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connexion error");
  });

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  userModel
    .find()
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.post("/adduser", (req, res) => {
  userModel
    .create({ name: req.body.name, email: req.body.email, age: req.body.age })
    .then(() => {
      res.end("User added succefully");
    })
    .catch((err) => {
      console.log(err);
      res.end("An error has ocurred");
    });
});

app.put("/updateuser", (req, res) => {
  userModel
    .findOneAndUpdate(
      {
        name: req.body.prevName,
      },
      {
        name: req.body.newName,
      },
      {
        new: true,
      }
    )
    .then((doc) => {
      console.log(doc);
      res.send(`User ${req.body.prevName} updated succesfully`);
    })
    .catch((err) => {
      console.error(err);
      res.send("An error occured");
    });
});

app.delete('/deleteuser', (req, res) => {
  userModel.findOneAndDelete({
    name: req.body.name
  })
  .then(doc => {
    console.log(doc)
    res.send("User deleted succesfully")
  })
  .catch(err => {
    console.error(err)
    res.send("An error ocurred")
  })
})

app.listen(5000, () => {
  console.log("Server listening...");
});
