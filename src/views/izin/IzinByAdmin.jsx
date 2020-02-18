import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';

import 'moment/locale/id';

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

import IzinPerjamByAdmin from 'views/izin/IzinPerjamByAdmin.jsx';
import IzinPerhariByAdmin from 'views/izin/IzinPerhariByAdmin.jsx';

class IzinByAdmin extends React.Component {
  render() {
    return (
      <Container className="mt--8">
        <Row>
          <Col className="col-12">
            <Card className="p-3 mb-3" body>
              <Row>
                <Col className="col-12 d-flex align-items-center justify-content-between">
                  <h2 className="m-0">Tambah Izin</h2>
                  <Button color="primary" onClick={() => this.props.history.goBack()}>
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col className="mb-3 mb-lg-0" lg="6">
            <Card>
              <CardHeader>
                <h3 className="m-0">Izin Per Jam</h3>
              </CardHeader>
              <CardBody>
                <IzinPerjamByAdmin />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <h3 className="m-0">Izin Per Hari</h3>
              </CardHeader>
              <CardBody>
                <IzinPerhariByAdmin />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(FadeIn(IzinByAdmin, Header));