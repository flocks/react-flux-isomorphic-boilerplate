var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstant");

var AppActions = {
    makeAction: function() {
        setTimeout(function() {
            AppDispatcher.dispatch({
                actionType: AppConstants.EVENT_CONSTANT
            });
        }, 500);

    }
};

module.exports = AppActions;
