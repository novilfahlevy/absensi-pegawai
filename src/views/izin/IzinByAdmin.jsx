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

import IzinByAdminForm from 'views/izin/IzinByAdminForm.jsx';

class IzinByAdmin extends React.Component {
  render() {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="col-12 mb-3 mb-lg-0">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="col-12 d-flex align-items-center justify-content-between">
                    <h2 className="m-0">Tambah Izin</h2>
                    <Button color="primary" onClick={() => this.props.history.goBack()}>
                      <i className="fas fa-arrow-left"></i>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <IzinByAdminForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(FadeIn(IzinByAdmin, Header));