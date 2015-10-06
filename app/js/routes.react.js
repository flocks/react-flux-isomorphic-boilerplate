var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require("./components/AppView.react");


var routes = (
    <Route handler={App} name="app" path="/"></Route>
);

module.exports = routes;
