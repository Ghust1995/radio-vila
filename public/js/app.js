import RadioApp from './components/RadioApp.react';
import React from 'react';
import ReactDOM  from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

window.React = React;
injectTapEventPlugin();

ReactDOM.render(
    <RadioApp />,
    document.getElementById('react')
);
