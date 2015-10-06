/*eslint-disable */

var express = require("express"),
    path = require("path"),
    app = express(),
    port = 3090,
    bodyParser = require("body-parser"),
    fs = require("fs");

require("node-jsx").install({extension: ".js"});


var pathApp = __dirname + "/../dist";

app.set("views", pathApp);


app.use(express.static(pathApp));

// set up ejs for templating. You can use whatever
app.set("view engine", "ejs");

// Include static assets. Not advised for production

var React = require("react");

var routes = require("../app/js/routes.react");
var Router = require("react-router");

var state = {};


// if using express it might look like this
app.use(function (req, res) {
  // pass in `fezfzereq.url` and the router will immediately match
    Router.run(routes, req.url, function (Handler) {

        var handler, markup;
        res.charset = "utf-8";
        
        handler = React.createElement(Handler); // factory
        markup = React.renderToString(handler); // html string
        res.render("index.ejs", {reactOutput: markup, state: JSON.stringify(state)});


    });
});

app.listen(port);

