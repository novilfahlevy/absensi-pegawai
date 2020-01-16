/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { storeUserData } from 'store/actions/authActions.js';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    if ( localStorage.getItem('auth') ) {
      this.props.storeUserData(localStorage.getItem('auth'));
    }
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if ('layout' in prop && prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      else if ('subMenu' in prop) {
        return prop.subMenu.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        });
      }
      else return null;
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      let menu = routes[i];
      if (path.includes(menu.layout + menu.path)) {
        return menu.name;
      }
      if ('subMenu' in menu) {
        for (let j = 0; j < menu.subMenu.length; j++) {
          let subMenu = menu.subMenu[j];
          if (path.includes(subMenu.layout + subMenu.path)) {
            return subMenu.name;
          }
        }
      }
    }
    return "Brand";
  };
  render() {
    return Boolean(localStorage.getItem('auth')) && JSON.parse(atob(localStorage.getItem('auth'))).name ? (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/logo.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    ) : <Redirect to="/auth/login" />
  }
}

export default connect(
  null,
  dispatch => ({
    storeUserData: data => dispatch(storeUserData(data))
  })
)(withRouter(Admin));