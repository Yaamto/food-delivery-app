const express = require('express');
require('dotenv').config()
require('./config/config')
const foodRoutes = require("./routes/foodRoutes")
const orderRoutes = require("./routes/orderRoutes")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const adminRoutes = require("./routes/adminRoutes")
const loggedRoutes = require("./routes/loggedRoutes")
const publicRoutes = require("./routes/publicRoutes")
const socket = require("socket.io")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requireAuth, checkUser, checkAdmin } = require('./middleware/auth');
const app = express()

const PORT = process.env.PORT || 3000
app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );
  

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.get("/jwtid", checkUser, (req, res) => {
   return res.status(200).json({user : res.locals.user})
   });

   app.get("/jwtid/admin", checkAdmin, (req, res) => {
    return res.status(200).json({user : res.locals.user})
    });
// app.get('/jwtid', requireAuth, (req, res) => {
//   return res.status(200).json({user : res.locals.user})
// });



app.use("/food", foodRoutes)
app.use("/order", orderRoutes)
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)

app.use("/public", publicRoutes)
app.use("/logged", loggedRoutes)
app.use("/admin", adminRoutes)


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}


const server = app.listen(PORT, () => console.log(`server running on port ${process.env.PORT}`));

const io = socket(server, {
  cors: {
      origin:"*",
      credentials:true,
  }
 
})

io.on("connection", (socket) => {
  console.log("connected to socket.io")
  
  
  socket.on('join-order', (userData) => {
    socket.join(userData)
    socket.emit("connected")
  })

  socket.on("send-status", (order) => {
    
    let orderID = order._id
    console.log(order.status)
    

    if(orderID){
      socket.in(order.customer_id).emit("recieve-status", order)
    }
  })

})
