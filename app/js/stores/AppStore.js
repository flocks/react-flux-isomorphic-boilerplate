var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var AppConstants = require("../constants/AppConstant");

// private

var CHANGE_EVENT = "change";
var _data = null;


var AppStore = assign({}, EventEmitter.prototype, {
    getData: function() {
        return _data;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
    case AppConstants.EVENT_CONSTANT:
        _data = "test";
        AppStore.emitChange();
        break;
    default:
        break;
    }
});

module.exports = AppStore;
