const express = require("express");
const router = express.Router();

// @ route  GET  api/order_details/test
// @ desc   Test order_details route
// @ access Public
router.get("/test", (req, res) => res.json({ msg: "Order Details works" }));

module.exports = router;
