import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import IzinCard from 'views/izin/IzinCard.jsx';
import CardsContainer from 'components/ui/CardsContainer.jsx';

import { withRouter } from 'react-router-dom';

class Izin extends React.Component {
  render() {
    return (
      <Container className="mt--8">
        <Row>
          <Col className="col-12">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="6">
                    <h2 className="m-0">Izin</h2>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Button color="success" size="md" onClick={() => this.props.history.push('/admin/izin-by-admin')}>
                      <i className="fas fa-plus mr-2"></i>
                      Tambah Izin
                    </Button>
                    <Button color="primary" size="md" onClick={() => this.props.history.push('/admin/riwayat-izin')}>
                      <i className="fas fa-list mr-2"></i>
                      Riwayat Izin
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <CardsContainer 
                  data={[...Array(20).fill(null)]}
                  card={data => (
                    <IzinCard />
                  )}
                  limitOptions={[4, 6, 10]}
                  lg="6"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FadeIn(withRouter(Izin), Header);