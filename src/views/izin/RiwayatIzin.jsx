import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import CardsContainer from 'components/ui/CardsContainer.jsx';
import RiwayatIzinCard from 'views/izin/RiwayatIzinCard.jsx';
import { withRouter } from 'react-router-dom';

class IzinRiwayat extends React.Component {
  render() {
    return (
      <Container className="mt--8">
        <Row>
          <Col className="col-12">
            <Card>
              <CardHeader>
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
              </CardHeader>
              <CardBody>
                <CardsContainer 
                  data={[1, 2, 3]}
                  card={data => (
                    <RiwayatIzinCard />
                  )}
                  limitOptions={[5, 10, 15]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FadeIn(withRouter(IzinRiwayat), Header);