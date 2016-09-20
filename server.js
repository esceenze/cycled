const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const app = new express();

const publicPath = path.resolve(__dirname, './public');

app.use(function handler(req, res) {
  const fileName = path.join(publicPath, req.url);

  fs.stat(fileName, (err, stats) => {
    if (!err && stats.isFile()) {
      log('REQ: ' + req.url + '. Send file ' + fileName);
      res.sendFile(fileName);
    }
    else {
      log('REQ: ' + req.url + '. Send index.html');
      res.sendFile(path.join(publicPath, './index.html'));
    }
  });
});

app.listen(PORT, function handler(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.info('[SERVER] Started at port %s', PORT, PORT);
  }
});

function log(msg) {
  return console.log('[' + new Date().toString() + '] ' + msg);
}
