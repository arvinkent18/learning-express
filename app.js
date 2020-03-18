
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');

const app = express();
const port = 3000;

const birds = require('./routes/birds');

const logger = (_req, _res, next) => {
  console.log('LOGGED');
  next();
};

const requestTime = (req, _res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(compression());
app.use(logger);
app.use(requestTime);
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(methodOverride());

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500);
});

app.get('/', (req, res) => {
  try {
    const time = req.requestTime;
    let responseText = 'Hello World!<br>';
    responseText += `<small>Requested at: ${time}</small>`;
    res.send(responseText);
  } catch (e) {
    res.status(500).send('Failed to fetch data');
  }
});

app.use('/birds', birds);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
