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
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from 'store/actions/authActions.js';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // Form,
  // FormGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Input,
  // InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import moment from 'moment';

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container className="d-flex justify-content-between" fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <span className="m-0 text-white text-sm font-weight-bold d-none d-lg-inline-block">
              {moment().format('dddd, Do MMMM YYYY')}
            </span>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    {/* <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span> */}
                    <Media className="ml-2">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.props.username}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => { e.preventDefault(); this.props.logout() }}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default connect(
  state => ({
    username: state.auth.user.name
  }),
  (dispatch, ownProps) => ({
    logout: () => dispatch(logout(ownProps.history.push))
  })
)(withRouter(AdminNavbar));
