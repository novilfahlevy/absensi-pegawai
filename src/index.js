import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-circular-progressbar/dist/styles.css';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-image-lightbox/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";

import { Provider } from 'react-redux';
import store from 'store/reducers/rootReducer.js';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/" render={() => <Redirect to="/auth/login" />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);