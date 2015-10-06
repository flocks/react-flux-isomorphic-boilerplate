describe("AppActions", function() {
    var AppDispatcher = require("../../app/js/dispatcher/AppDispatcher");
    var AppActions = require("../../app/js/actions/AppActions");
    var AppConstants = require("../../app/js/constants/AppConstant");
    var timerCallback;

    beforeEach(function() {
        spyOn(AppDispatcher, "dispatch");
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();

    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should call", function() {
        AppActions.makeAction();
        jasmine.clock().tick(1000);

        expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
            actionType: AppConstants.EVENT_CONSTANT
        });
    });

});
