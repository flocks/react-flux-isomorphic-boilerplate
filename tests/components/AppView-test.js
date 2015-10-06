describe("AppView", function() {
    var React = require("react");

    var TestServices = require("../TestServices"),
        AppView = require("../../app/js/components/AppView.react"),
        component = TestServices.shallowRenderer(AppView, {}, TestServices.getRouterContext());

    it("should be a div", function() {
        console.log(component);
        expect(component.type).toEqual("div");
    });

});
