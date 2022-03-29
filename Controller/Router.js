const express = require("express");
const router = express.Router();
const foodModel = require("../Model/Model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).single("foodimage");

router.post("/", upload, async (req, res) => {
  try {
    const postData = await foodModel.create({
      foodname: req.body.foodname,
      foodtype: req.body.foodtype,
      fooddiet: req.body.fooddiet,
      fooddiscription: req.body.fooddiscription,
      foodimage: req.file.path,
    });

    res.status(200).json({
      message: "Data posted Sucessfully",
      data: postData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to post DATA",
      data: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const getAllData = await foodModel.find();
    res.status(200).json({
      message: "DATA Gotten Sucessfully",
      data: getAllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to get DATA",
      data: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getDataByID = await foodModel.findById(req.params.id);
    res.status(200).json({
      message: `${req.params.id} Gotten Sucessfully`,
      data: getDataByID,
    });
  } catch (error) {
    res.status(404).json({
      message: `Failed to get ${req.params.id}`,
      data: error.message,
    });
  }
});

router.patch("/edit/:id/", async (req, res) => {
  try {
    const editAllData = await foodModel.findByIdAndUpdate(
      req.params.id,
      req.body
      // {
      //   foodname: req.body.foodname,
      //   foodtype: req.body.foodtype,
      //   fooddiet: req.body.fooddiet,
      //   fooddiscription: req.body.fooddiscription,
      //   foodimage: req.file.path,
      // },
      // { new: true, runValidator: true }
    );
    res.status(200).json({
      message: "Data Edited Sucessfully",
      data: editAllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed To Edit Data",
      data: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteData = await foodModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `${req.params.id} Deleted Sucessfully`,
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      message: `Failed to Delete ${req.params.id}`,
      data: error.message,
    });
  }
});

module.exports = router;
