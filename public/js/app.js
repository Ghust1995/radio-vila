var RadioApp = require('./components/RadioApp.react');
var RadioExampleData = require('./RadioExampleData');
var RadioWebAPIUtils = require('./utils/RadioWebAPIUtils');
var React = require('react');
var ReactDOM = require('react-dom');
window.React = React;

RadioExampleData.init();

RadioWebAPIUtils.init();

ReactDOM.render(
    <RadioApp />,
    document.getElementById('react')
);
