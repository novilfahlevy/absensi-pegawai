import React from 'react';
import api from 'store/api.js';

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
  state = {
    izin: []
  };

  getIzinToday = () => {
    api().get('users/izin')
    .then(response => {
      this.setState({ izin: response.data.data }, () => {
        this.setState({ izin: this.state.izin });
      });
    });    
  }

  componentDidMount() {
    this.getIzinToday();
  }

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
                  data={this.state.izin}
                  card={user => (
                    <IzinCard user={user} getIzinToday={this.getIzinToday} />
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

export default FadeIn(withRouter(Izin), Header);