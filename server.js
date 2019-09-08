const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

//route file declare
const ProfileApis = require('./server/APIs/ProfileApiService.js')
const LogApis = require('./server/APIs/LogApiService.js')
const TeamApis = require('./server/APIs/team_api_service.js')

//main framwork declare
var app = express();

// For vue.js history mode
app.use(history({
  rewrites: [
    {
      from: /^\/dist\/.*$/,
      to: function(context) {
        return context.parsedUrl.pathname;
      }
    },
    {
      from: /^\/.*[js|css]$/,
      to: function(context) {
        return '/dist/'+context.parsedUrl.pathname;
      }
    },
    {
      from: /^\/.*$/,
      to: function(context) {
        return '/dist/';
      }
    },
  ]
}));

app.use(express.static(__dirname));

//body parser-for POST Info to transfer in http packet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//router-sub directory separation
var ProfileRouter = express.Router();
new ProfileApis(ProfileRouter);
app.use('/Profile', ProfileRouter);

var LogRouter = express.Router();
new LogApis(LogRouter);
app.use('/Log', LogRouter);

var TeamRouter = express.Router();
new TeamApis(TeamRouter);
app.use('/team', TeamRouter);

const hostname = '0.0.0.0';

var port
if (process.env.NODE_ENV === 'production') {
  port = 80;
} else {
  port = 5000;
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
