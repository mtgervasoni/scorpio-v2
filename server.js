const express = require("express");

const app = express();

//Bring in routes:
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const order_details = require("./routes/api/order_details");
const orders = require("./routes/api/orders");
const profiles = require("./routes/api/profiles");

//STRIPE:
const stripe = require("stripe")("sk_test_8FszdpnPQNwdCZGQ4BuVNjDY");
app.use(require("body-parser").text());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//Pull in connection info from config/keys
const sql_info = require("./config/keys").mySQL_info;

//Connect to mySQL DB
var mysql = require("mysql");
var connection = mysql.createConnection(sql_info);
connection.connect(function(err) {
  if (err) {
    console.log("Error Connecting to database. Error:", err);
  } else console.log("MySQL DB Connected");
});

// Use Routes:
app.use("/api/users", users);
app.use("/api/items", items);
app.use("/api/orders", orders);
app.use("/api/profiles", profiles);
app.use("/api/order_details", order_details);

// Test/example
app.get("/", (req, res) => {
  connection.query("SELECT * from test LIMIT 2", function(err, rows, fields) {
    if (!err) console.log("The solution is: ", rows);
    else console.log("Error while performing Query.");
    res.send(rows);
    connection.end();
  });
});

//STRIPE
app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});
