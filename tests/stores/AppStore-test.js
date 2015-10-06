describe("AppStore", function() {
    var AppDispatcher = require("../../app/js/dispatcher/AppDispatcher");
    var AppStore = require("../../app/js/stores/AppStore");
    var AppConstants = require("../../app/js/constants/AppConstant");

    beforeEach(function() {
        AppStore.__set__("_data", null);
    });

    it("should update data to 'test'", function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.EVENT_CONSTANT
        });
        var data = AppStore.getData();
        expect(data).toEqual("test");
    });

});
