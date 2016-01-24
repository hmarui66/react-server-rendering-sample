var express = require('express');
var app = express();
var path = require('path');
var React = require('../public/assets/app.server');

app.use(express.static(path.join(__dirname, '..', 'public')));

// for server side logic
app.get('/api/me', function (req, res, next) {
  res.json({ name: 'hoge', date: new Date() });
});

app.get('/api/items', function (req, res, next) {
  res.json([
    {id: 1, text: 'first'},
    {id: 2, text: 'second'},
    {id: 3, text: 'third'}
  ]);
});

app.get('/api/users', function (req, res, next) {
  res.json([
    {id: 1, name: 'Hoge'},
    {id: 2, name: 'Fuga'},
    {id: 3, name: 'Bar'}
  ]);
});

// for server side rendering
app.get('*', function (req, res, next) {
  React(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
