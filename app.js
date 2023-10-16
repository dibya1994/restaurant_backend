const express = require('express');
require('dotenv').config()
const authRoutes = require('./routes/auth-routes'); 
const cookieParser = require("cookie-parser");
const path = require('path');
var flash = require('connect-flash');
const exp = require('constants');
const cors = require('cors');



const app = express();

app.use(express.json());
app.use((req,res,next)=>{
  // console.log("HTTP method - "+ req.method + " , URL -"+ req.url);
  next();
});


const port = process.env.PORT
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
// CORS is enabled for all origins
app.use(cors());
// app.use(
//     session({
//       secret: "secret",
//       resave: true,
//       saveUninitialized: true,
//       cookie:{maxAge:oneDay}
//     })
// );
app.use(flash());

app.use(express.static(path.join(__dirname, "/public")));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false}));
// Parse JOSN bodies (as sent by API clients);
app.use(express.json());


// use routes here----------------

app.use(authRoutes.routes);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

