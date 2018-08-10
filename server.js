// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Following section was completed by Bradley Burrows

app.get("/api/whoami", (req, res) => {
  let whoAmI = {};
  whoAmI.ipaddress = (req.get("x-forwarded-for") || "").split(",").shift() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  whoAmI.language = req.get("Accept-Language");
  whoAmI.software = req.get("User-Agent");
  res.json(whoAmI);
});

// End of user completed section

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
