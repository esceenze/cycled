/*eslint-disable*/

var glob = require("glob");
var fs = require('fs');
var object = require('lodash/fp/object');

var availableTranslations = ['ru'];

var fileHeader = "/*eslint-disable*/\nmodule.exports = ";

glob("strings/**/*.json", function (er, files) {
  var messagesResult = [];
  files.map(function(file) {
    var messagesArray = require('./'+file);
    messagesArray.map(function(message) {
      messagesResult.push(message);
    });
  });
  console.log(JSON.stringify(messagesResult, null, "\t"));
});
