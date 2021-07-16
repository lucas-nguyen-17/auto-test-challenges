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

router.post("/echo", function (req, res, next) {
    res.send(req.body);
});

router.get("/lotto", function (req, res, next) {
    const lotto = require("../data/lotto.json");
    res.send(lotto);
});

router.get("/bookstore", function (req, res, next) {
    const bookstore = require("../data/bookstore.json");
    res.send(bookstore);
});

router.get("/error", function (req, res, next) {
    console.log(`req.query.test = ${req.query.test}`);
    if (req.query.test !== undefined) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
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
    res.send({ message: "Uploaded successfully" });
});

router.get("/challeng2postman", function (req, res, next) {
    const data = {
        "data": {
            "instruction01": "1",
            "instruction02": "2",
            "fake": "distraction",
            "instruction03": "3",
            "instruction04": "4",
            "instruction05": "5",
            "created": 123131231
        }
    };
    res.send(data);
});

module.exports = router;
