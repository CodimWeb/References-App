//styles
import './scss/style.scss';

// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import {createStore} from 'redux';
import { Provider } from 'react-redux';
// import rootReducer from './redux/rootReducer';
import store from './redux/store/store.js'


//components
import App from './App';
import References from './pages/References/References.js'
import ReferencesRecord from './pages/References/ReferencesRecord.js'
import Views from './pages/Views/Views.js'
import Shares from './pages/Shares/Shares.js'
import View from './pages/View/View.js'
import Page404 from './pages/Page404/Page404.js'
import PlayList from './pages/PlayList/PlayList.js'
import ShareAll from './pages/ShareAll/ShareAll.js'

//serviceWorker
import * as serviceWorker from './serviceWorker';

var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
console.log(ES6Promise, 'promise');

// const store = createStore(rootReducer)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/references/' component={ References } />
                    <Route exact path='/references/:type' component={ References } />
                    <Route exact path='/references/record/:id' component={ ReferencesRecord } />
                    <Route path='/views/' component={ Views } />
                    <Route path='/shares/' component={ Shares } />
                    <Route path='/share-all/' component={ ShareAll } />
                    <Route path='/view/playlist/:id/' component={ PlayList } />
                    <Route path='/view/:id/' exact component={ View } />
                    <Route path='/view/:id/:scroll' exact component={ View } />
                    
                    <Route component={ Page404 } />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>    
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
