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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import FadeIn from 'react-fade-in';
import api from 'store/api.js';

class DashboardHeader extends React.Component {
  state = {
    jumlah: {
      pegawai: 0,
      absen: 0,
      belum_absen: 0
    }
  }

  componentDidMount() {
    api().get('dashboard')
      .then(response => {
        const { total_pegawai, total_pegawai_absen, total_pegawai_belum_absen } = response.data.data;
        this.setState({
          jumlah: {
            pegawai: total_pegawai,
            absen: total_pegawai_absen,
            belum_absen: total_pegawai_belum_absen
          }
        })
      })
  }

  render() {
    const { pegawai, absen, belum_absen } = this.state.jumlah;
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <FadeIn delay="100">
                <Row>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              Total Pegawai
                            </CardTitle>
                            <span className="h1 font-weight-bold mb-0">
                              {pegawai}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-user-tie" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Absen Hari Ini
                            </CardTitle>
                            <span className="h1 font-weight-bold mb-0">
                              {absen}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="far fa-list-alt" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Belum Absen Hari Ini
                            </CardTitle>
                            <span className="h1 font-weight-bold mb-0">
                              {belum_absen}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="far fa-list-alt" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              Pegawai Lembur Hari Ini
                            </CardTitle>
                            <span className="h1 font-weight-bold mb-0">2</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-purple text-white rounded-circle shadow">
                              <i className="fas fa-moon" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>                                        
              </FadeIn>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default DashboardHeader;
