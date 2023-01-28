const express = require("express");
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
const adminRouter = require("./routes/admin");


//routes
app.use('/admin',adminRouter);




//Database
const { connectDB } = require("./config/dbConfig");

const startServer = async function () {
  try {
    await connectDB();
    app.listen(5000, (err) => {
      if (err) {
        console.log("Error in starting the server at port :", 5000);
        return;
      }
      console.log("Server running at port :", 5000);
    });
  } catch (error) {

    console.log('Error in starting the server .', error);
  }
};

startServer();
