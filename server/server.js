const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const routes = require('./router');
const config = require('./config');
const compression = require('compression');

const app = express();

app.use(cors());
app.use(favicon(path.resolve(__dirname, '../dist/static/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression({ threshold: 0 }));
app.use('/api', routes);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'));
  res.send(html);
});

app.listen(config.port, () => {
  console.log(`Server running in port ${config.port}`);
});
