import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'scenes/Root';
import registerServiceWorker from 'registerServiceWorker';
import 'styles/App.scss';

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
