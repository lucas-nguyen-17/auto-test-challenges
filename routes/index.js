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

router.post("/challenge2postman", function (req, res, next) {
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

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 2));
});

router.get("/challenge3postman", function (req, res, next) {
    let data = {
        "success": "true",
        "Result": {
            "Response": [
                {
                    "Material Id": "e838663839398f",
                    "Material Department": "OT"
                }
            ]
        }
    };

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 2));
});

router.get("/challenge4postman", function (req, res, next) {
    res.send(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
});

router.get("/challenge3restassured", function (req, res, next) {
    let data = {
        "data": {
            "key1": {
                "number": 10,
                "data": {
                    "number": 1
                }
            },
            "key2": {
                "number": 20,
                "data": {
                    "number": 1
                }
            },
            "key 3": {
                "number": 30,
                "data": {
                    "number": 1
                }
            }
        }
    };

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 2));
});

router.get("/challenge4restassured", function (req, res, next) {
    let data = [
        {
            "id": "0001",
            "type": "donut",
            "name": "Choco Blueberry Cake",
            "ppu": 0.55,
            "batter": [
                {
                    "id": "1001",
                    "type": "Regular"
                },
                {
                    "id": "1002",
                    "type": "Chocolate"
                },
                {
                    "id": "1003",
                    "type": "Blueberry"
                }
            ]
        },
        {
            "id": "0002",
            "type": "donut",
            "name": "Choco Blueberry Cake",
            "ppu": 0.55,
            "batter": [
                {
                    "id": "1001",
                    "type": "Regular"
                },
                {
                    "id": "1002",
                    "type": "Chocolate 2"
                },
                {
                    "id": "1003",
                    "type": "Blueberry"
                }
            ]
        }
    ];

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 2));
});

module.exports = router;
