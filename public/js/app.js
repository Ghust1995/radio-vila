var RadioApp = require('./components/RadioApp.react');
var RadioExampleData = require('./RadioExampleData');
var RadioWebAPIUtils = require('./utils/RadioWebAPIUtils');
var React = require('react');
window.React = React;

RadioExampleData.init();

RadioWebAPIUtils.getSongQueue();

React.render(
    <RadioApp />,
    document.getElementById('react')
);
