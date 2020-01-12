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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import ProfileForm from "./ProfileForm.jsx";
class Profile extends React.Component {
  state = {
    modalOpen: false
  }
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  render() {
    const { modalOpen } = this.state;
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4 text-center">
                  <Row>
                    <Col className="col-12">
                      <img
                        alt="..."
                        height="200"
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </Col>
                    <Col className="col-12">
                      <Button style={{ marginTop: "1rem" }} color="primary" size="md">Ubah Gambar Profile</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Akun Saya</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="success" onClick={this.toggleModal} size="sm">
                        Ubah Profile
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <h3>Username</h3>
                          <h5>Novil Fahlevy</h5>
                        </Col>
                        <Col lg="12" style={{ marginTop: "1.5rem" }}>
                          <h3>Email</h3>
                          <h5>MirrorBottle24@gmail.com</h5>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4" style={{ marginTop: "1.5rem" }}>
                      <Row>
                        <Col md="12">
                          <h3>Address</h3>
                          <h5>Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09</h5>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ProfileForm modal={modalOpen} toggle={this.toggleModal} />
        </Container>
      </>
    );
  }
}

export default Profile;
