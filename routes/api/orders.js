const express = require("express");
const router = express.Router();

// @ route  GET  api/orders/test
// @ desc   Test orders route
// @ access Public
router.get("/test", (req, res) => res.json({ msg: "Orders works" }));

module.exports = router;
