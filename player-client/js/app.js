var PlayerApp = require('./components/PlayerApp.react');
var PlayerWebAPIUtils = require('./utils/PlayerWebAPIUtils');
var React = require('react');
var ReactDOM = require('react-dom');
window.React = React;

PlayerWebAPIUtils.init();

ReactDOM.render(
    <PlayerApp />,
    document.getElementById('react')
);
