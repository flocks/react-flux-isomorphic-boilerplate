var React = require("react");
var router = require("./router");

router.run(function (Handler, state) {
    React.render(
        <Handler query={state} />,
        document.getElementById("app")
    );
});

