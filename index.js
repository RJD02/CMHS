const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const Doctor = require("./model/doctor");
const authRoutes = require("./routes/auth");

const app = express();
mongoose
  .connect(
    "mongodb+srv://admin-raviraj:test123@cluster0.lkxsz.mongodb.net/zaid?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

const asyncWrapper = async (fn) => {
  try {
    return fn;
  } catch (e) {
    console.log(e);
  }
};

const createDoctor = async () => {
  const doc = new Doctor({
    name: "name",
    exp: 1,
    location: "location",
    ratings: 2,
    profileImg: "url",
  });
  await doc.save();
};

app.use("/auth", authRoutes);

app.post("/api/doctor", async (req, res) => {
  const { name, exp, location, ratings, profileImg } = req.body;
  console.log(req.body);
  try {
    const newDoc = new Doctor({
      name,
      exp,
      location,
      ratings,
      profileImg,
    });
    await newDoc.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get("/api/doctor", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log(doctors);
    res.send({ doctors });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get("/api/doctor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      res.send({ msg: "No doctor of that id" });
    } else {
      res.send({ doctor });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post("/api/doctor/search", async (req, res) => {
  const { keyword } = req.body;
  console.log(req.body);
  try {
    const doctor = await Doctor.find({ name: { $regex: `${keyword}` } });
    if (!doctor) {
      res.send({ msg: "No doctor with that name" });
    } else {
      res.send({ doctor });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen("8000", () => console.log("listening on port 8000"));
