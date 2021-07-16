const express = require("express");


// setting express server
const app = express();
const port = process.env.PORT || 8000;

// for parse data
app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes for folders
require("./routes/api")(app);

require("./routes/html")(app);


app.listen(port, () => console.log("listening on port:", port));







