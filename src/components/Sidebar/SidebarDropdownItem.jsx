import React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as NavLinkRRD } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'assets/css/components/sidebar/SidebarDropdownItem.css';

class SidebarDropdownItem extends React.Component {
  state = {
    isOpen: false
  };
  
  toggle = (e = null) => {
    e && e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen }, () => {
      let openArrow = document.querySelector(`.ni.ni-bold-down.ml-2#sidebarMenu${this.props.name}`);
      openArrow.style.transform = `rotate(${this.state.isOpen ? -180 : 0}deg)`;
    });
  }

  componentDidMount() {
    this.props.subMenu.forEach(({ path, layout }) => {
      if ( this.props.location.pathname === layout + path ) {
        this.toggle();
      }
    });
  }

  render() {  
    return (
      <>
        <NavItem>
          <NavLink onClick={this.toggle} style={{ cursor: 'pointer' }}>
            <i className={this.props.icon} />
            {this.props.name}
            <span className="ni ni-bold-down ml-2" id={`sidebarMenu${this.props.name}`}></span>
          </NavLink>
        </NavItem>
        <Collapse isOpen={this.state.isOpen}>
          <Card className="border-0">
            <CardBody className="py-0 pl-4">{
              this.props.subMenu.map((prop, key) => {
                return (
                  <NavItem key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      activeClassName="active"
                      style={{ cursor: 'pointer' }}
                    >
                    <i className={prop.icon} />
                    {prop.name}
                    </NavLink>
                  </NavItem>
                )
              })
            }</CardBody>
          </Card>
        </Collapse>
      </>
    );
  }
}

export default withRouter(SidebarDropdownItem);