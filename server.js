const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors=require('colors')
const errorHandler=require("./middleware/error")
// const logger=require("./middleware/logger")     // my middleware logger
//load env vars
dotenv.config({
    path: "./config/config.env"
});

const connectDB=require("./config/db")



//connect to database
connectDB()
//Route files
const bootcamps=require("./routes/bootcamps")

const app = express();

//Body Parser
app.use(express.json())

// dev logging middleware
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}

// app.use(logger)

//Mount Routers
app.use('/api/v1/bootcamps',bootcamps)

app.use(errorHandler)
const PORT = process.env.PORT || 5000;

const server=app.listen(
    PORT,
    console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red)
    //Close Server and exit process
    server.close(()=>process.exit(1))
})