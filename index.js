var express = require('express');
var bodyParser = require('body-parser');

// Config App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));

// Error Handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static('./dist'));

// Start App
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
