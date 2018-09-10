const express = require("express");

const app = express();

//Use Sequelize:
const Sequelize = require("sequelize");

// const sequelize = new Sequelize("scorpio_db", "root", "positive8", {
//   host: "localhost",
//   dialect: "mysql",
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

// const User1 = sequelize.define("myusers", {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });

// force: true will drop the table if it already exists
// User1.sync({ force: true }).then(() => {
//   // Table created
//   return User1.create({
//     firstName: "John",
//     lastName: "Hancock"
//   });
// });

// const Test1 = sequelize.define("test1", {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });

// force: true will drop the table if it already exists
// Test1.sync({ force: true }).then(() => {
//   // Table created
//   return Test1.create({
//     firstName: "John2",
//     lastName: "Hancock2"
//   });
// });

// Test1.findAll();

// User1.findOne().then(ret => {
//   console.log(ret);
// });

require("./routes")(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

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
var mysql = require("mysql2");
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
