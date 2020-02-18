import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import RiwayatIzinPerjam from 'views/izin/RiwayatIzinPerjam.jsx';
import RiwayatIzinPerhari from 'views/izin/RiwayatIzinPerhari.jsx';

import { withRouter } from 'react-router-dom';

class IzinRiwayat extends React.Component {
  render() {
    return (
      <Container className="mt--8">
        <Row>
          <Col className="col-12">
            <Card className="p-3 mb-3" body>
              <Row className="align-items-center">
                <Col xs="6">
                  <h2 className="m-0">Riwayat Izin</h2>
                </Col>
                <Col className="text-right" xs="6">
                  <Button color="primary" onClick={() => this.props.history.goBack()}>
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col className="col-12">
            <RiwayatIzinPerjam />
          </Col>
          <Col className="col-12">
            <RiwayatIzinPerhari />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FadeIn(withRouter(IzinRiwayat), Header);