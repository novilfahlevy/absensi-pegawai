import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon
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
                <Form onSubmit={this.handleCariSubmit}>
                  <InputGroup className="mb-3">
                    <Input type="search" name="search" id="search" placeholder="Cari pegawai" />
                    <InputGroupAddon addonType="append">
                      <Button type="submit" color="primary">Cari</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
                <Button color="success" className="mb-2">
                  <span className="fas fa-undo mr-2"></span>
                  Muat Ulang Data
                </Button>
                <CardsContainer 
                  data={[1, 2, 3]}
                  card={data => (
                    <RiwayatIzinCard />
                  )}
                  limitOptions={[5, 10, 20]}
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