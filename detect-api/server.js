const express = require('express');
const routes = require('./routes');

const app = express()
const port = 3001

/*
 * Configuring express
 */
app.use( express.static(__dirname + '/public') )

// Logging requests
app.use( function (req, res, next) {
	console.log('Method:', req.method)
	console.log('Url:', req.url)
	console.log('BaseUrl:', req.baseUrl)
  console.log('OriginalUrl:', req.originalUrl)
	console.log('Query:', req.query)
	console.log('Params:', req.params)
	console.log('Referer:', req.headers.referer)
	next()
})

app.use( function (err, req, res, next) {
	console.log('Error: ', err)
	res.status(500).send('Something is not working... Error: ' + err)
})

//CORS middleware
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain)

app.use('/', routes)

/*
 * Start app server
 */
app.listen(port, function (err) {
	if (err) {
		return console.log('App listening error. Error: ', err)
	}
	console.log('Express server is listening on ' + port)
})
