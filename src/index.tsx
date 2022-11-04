import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client';
import {store}  from './app/store';
const rootElement:any = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    // <React.StrictMode>
 <Provider store={store}>

    <HashRouter>
        <ScrollToTop>
            <App></App>
        </ScrollToTop>
    </HashRouter>
 </Provider>
    // </React.StrictMode>
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();