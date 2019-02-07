import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Recipe from './Recipe';
import Error from './Error';

import Layout from './Layout';

export default class Router extends Component {
    render() {
        return(
        <BrowserRouter>
            <Switch>
                <Layout exact path="/" component={App} />
                <Layout path="/recipe/:id" component={Recipe} />
                <Layout component={Error} />
            </Switch>
        </BrowserRouter>
        )
    }
}

// export default Router;