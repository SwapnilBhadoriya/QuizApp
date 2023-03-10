const express = require("express");
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
const userRouter = require('./routes/user');
const adminRouter = require("./routes/admin");
const authRouter = require('./routes/authenticate')


//routes
app.use('/',authRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);




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
