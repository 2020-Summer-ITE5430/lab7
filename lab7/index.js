const express = require('express');
const userRouteWithDB = require('./routes/api/userRouteWithDB');
const connectDB = require('./config/connectDB');

const app = express();

app.use(express.json());

//connect to db
connectDB();

app.use('/api/user', userRouteWithDB);

app.listen(5000, () => {
  console.log('server started');
});
