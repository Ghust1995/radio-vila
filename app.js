var RadioApp = require('./public/js/components/RadioApp.react');
var RadioExampleData = require('./public/js/RadioExampleData');
var RadioWebAPIUtils = require('./public/js/utils/RadioWebAPIUtils');
var React = require('react');
window.React = React;

RadioExampleData.init();

RadioWebAPIUtils.getSongQueue();

React.render(
    <RadioApp />,
    document.getElementById('react')
);
