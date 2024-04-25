const express = require("express")
const { connectDB } = require("./db/db");
const uRoute = require('./routes/userr')
const pRoute = require('./routes/profiler')
const proRoute = require('./routes/productr')
const cartRoute = require('./routes/cartr')
const app = express();
connectDB();
app.use(express.json())
app.use('/', uRoute)//user
app.use('/profile', pRoute)//profile
app.use('/', proRoute)//product
app.use('/cart', cartRoute)//cart

app.listen(3000, () => {
  console.log("Server Started");
});
