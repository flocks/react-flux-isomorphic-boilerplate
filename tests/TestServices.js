var React = require("react/addons"),
    TestUtils = React.addons.TestUtils,
    ReactContext = require("react/lib/ReactContext"),
    objectAssign = require("object-assign");

module.exports = {
    shallowRenderer: function(component, props, context) {
        context = context || {};
        ReactContext.current = context;
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(component, props), context);

        ReactContext.current = {};

        return shallowRenderer.getRenderOutput();
    },
    getRouterContext: function(pathname) {
        var router = objectAssign(function() {}, {
            getCurrentPathname: function() {
                return pathname || undefined;
            },
            isActive: function() {},
            makeHref: function() {}
        });

        return {
            router: router
        };
    },
    wrapWithContext: function(Component, context, contextTypes) {
        return React.createClass({
            childContextTypes: contextTypes,
            getChildContext: function() {
                return context;
            },
            render: function() {
                return <Component {...this.props} ref="children" />;
            }
        });
    }
};
