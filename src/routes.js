import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Login from './pages/login';
import Main from './pages/main';
import Usuarios from './pages/usuarios';
import Usuario from './pages/usuario';
import Propriedades from './pages/propriedades';
import Talhoes from './pages/talhoes';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/inicio" component={Main} />
            <Route path="/usuarios" component={Usuarios} />
            <Route path="/propriedades" component={Propriedades} />
            <Route path="/talhoes" component={Talhoes} />
            <Route path="/usuario/:id" component={Usuario} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;