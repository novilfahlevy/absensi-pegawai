import React from 'react';

import Header from 'components/Headers/Header.jsx';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardText,
  CardTitle,
} from 'reactstrap';

import { withRouter, Link } from 'react-router-dom';

class PermintaanLembur extends React.Component {
  render() {
    let styles = {
      card: {
        border: "none",
        boxShadow: "-6px -6px 20px rgba(255, 255, 255, 1), 6px 6px 20px rgba(0, 0, 0, .1)",
      }
    }
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h2 className="m-0">Permintaan Lembur</h2>
                </CardHeader>
                <CardBody>
                  <Card body style={styles.card}>
                    <Row>
                      <Col lg={8} sm={12} className="col-6 col-sm-12">
                        <CardTitle className="m-0">Fadhil Dhanendra</CardTitle>
                        <CardText>
                          <span className="font-weight-bold">20:00</span> - <span className="font-weight-bold">22:00</span>
                          <span className="font-weight-bold d-block mt-2">Keterangan : </span>
                          <p className="m-0">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque aliquam laudantium facilis consequatur enim vel nisi amet! Dolor, facilis corporis?</p>
                        </CardText>
                      </Col>
                      <Col lg={4} sm={12} className="col-6 col-sm-12 d-flex justify-content-sm-start justify-content-lg-end align-items-center">
                        <Link className="text-white" to={``} style={{ marginRight: "1rem" }}>
                          <Button className="w-70 h-70 bg-success text-white">
                            <i className="fas fa-check text-white"></i>
                          </Button>
                        </Link>
                        <Link className="text-white" to={``}>
                          <Button className="w-70 h-70 bg-danger text-white">
                            <i className="fas fa-times text-white"></i>
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(PermintaanLembur);