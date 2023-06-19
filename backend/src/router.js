const express = require("express");
const multer = require("multer");
const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const upload = multer({ dest: "./public/uploads/" });

router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
