const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "storage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
    res.send("Hello world");
});

router.get("/upload", async (req, res, next) => {
    try {
        const storagePath = path.join(__basedir, "storage");
        const files = fs.readdirSync(storagePath);
        res.send(files);
    } catch (e) {
        res.sendStatus(500) && next(e);
    }
});

router.post("/upload", upload.single("file-key"), async (req, res, next) => {
    res.send("Uploaded successfully");
});

module.exports = router;
