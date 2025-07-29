// URL : http://localhost:8383
// IP : 127.0.0.1:8383
const express = require("express");

const app = express();

// let data = {
//   name: "Hamza",
// };
let data = ["Hamza"]

// MIDDLEWARE
app.use(express.json());

// Endpoints - HTTP VERBS(methods) && Routes (or paths)
//  The method informs the nature of req and route is further subdirectory (basically, we direct the req to body of code to respond apropriately, and thses locations or routes called enndpoints)

// We I hit enters on browser with / url means and event is emited so this callback Fn gets called i did not called it, its express

//Type 1 - Website Endpoints (these endpoints are for sending back html and they are typically come when a user enters a url in a browser)

app.get("/", (req, res) => {
  console.log('Yay I hit an endpoint', req.method, req.url, req.ip, req.originalUrl, req.headers.host);
  // res.sendStatus(200)
  //   res.send("<h1>Homepage</h1><input/>");
  res.send(`
        <body
        style="background:pink;color: blue;">
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href= "/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script logged on browser')</script>
    `);
});

app.get("/dashboard", (req, res) => {
  console.log(`Ohh, now i hit the ${req.originalUrl} endpoint`);
  res.send(`
    <body>
    <h1>${req.originalUrl}</h1>
    <a href= "/">HomePage</a>
    </body>
    `);
});
// Type 2 - API endpoints (Non-visual)

// CRUD-method
// create - POST, read -GET, update - PUT/PATCH and delete - DELETE

app.get("/api/v1/data", (req, res) => {
  console.log("This one was for data");
  res.status(200).send(data);
});

app.post('/api/v1/data', (req, res)=>{
    // In Express Most commanly peaople send data in Json
    // Someone wants to create a user (for example when they signUp button)
    // the user clicks the button after entering their credentials, and thier browser is wired uo to send out a network req to server to handle that action
    const newEntry = req.body

    console.log(newEntry);
    data.push(newEntry.name)
    
    res.sendStatus(201);
})

app.delete('/api/v1/data', (req, res)=>{
    const popedElement = data.pop();
    console.log('We deleted the element off the end of array:',popedElement)
    res.sendStatus(204);
})


const PORT = 8383;
app.listen(PORT, () => console.log(`Server is started at ${PORT}`));
