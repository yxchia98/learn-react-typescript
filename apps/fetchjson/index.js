"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(url).then(function (response) {
    var todo = response.data;
    var title = todo.title;
    var id = todo.id;
    var finished = todo.completed;
    console.log("\n  The Todo with ID: ".concat(id, "\n  Has a Title of: ").concat(title, "\n  Is it finished? ").concat(finished, "\n  "));
});
