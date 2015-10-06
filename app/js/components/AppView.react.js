var React = require("react");
var AppStore = require("../stores/AppStore");
var AppActions = require("../actions/AppActions");



function getState() {
    return {
        data: AppStore.getData()
    };
}


var App = React.createClass({
    getInitialState: function() {
        return getState();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onAppStoreChange);
        AppActions.makeAction();
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onAppStoreChange);
    },
    _onAppStoreChange: function() {
        this.setState(getState());
    },
    render: function () {
        if (this.state.data == null) {
            return (
                <div>
                    <h2>App</h2>
                    <p>..loading..</p>
                </div>
            );        
        }
        else {
            return (<div><h2>App</h2> <p>{this.state.data}</p></div>);
        }
        
    }
});

module.exports = App;
