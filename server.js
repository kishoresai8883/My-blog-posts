const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const path = require('path');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

connectDb();

const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} Mode Port Number ${PORT}`.bgCyan.white)
})