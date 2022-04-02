const express = require("express");
const router = express.Router();
let testAPI = require("../faker"); 

router.get("/", (req, res) => {
    res.render("index.html")
})


//module.exports = router;

module.exports = app => {
    router
    testAPI(app);
}
