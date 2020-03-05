import React from 'react';
import api from 'store/api.js';

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
import LoadingButton from 'components/ui/LoadingButton.jsx';
import { withRouter } from 'react-router-dom';

class IzinRiwayat extends React.Component {
  state = {
    izin: [],
    searchIzinKeyword: '',
    searchIzinLoading: false,
    refreshDataLoading: false
  };

  searchIzinHistory = e => {
    e.preventDefault();
    if ( this.state.searchIzinKeyword ) {
      this.setState({ searchIzinLoading: true });
      api().get(`search/users/${this.state.searchIzinKeyword}/izin/riwayat`)
        .then(response => {
          this.setState({ izin: response.data.data }, () => {
            this.setState({ izin: this.state.izin }, () => {
              this.setState({ refreshDataLoading: false });
              this.setState({ searchIzinLoading: false });
            });
          });
        }); 
    }
  }

  getIzinHistory = () => {
    api().get('users/izin/riwayat')
    .then(response => {
      this.setState({ izin: response.data.data }, () => {
        this.setState({ izin: this.state.izin }, () => {
          this.setState({ refreshDataLoading: false });
        });
      });
    }); 
  }

  componentDidMount() {
    this.getIzinHistory();
  }

  refreshData = e => {
    e.preventDefault();
    this.setState({ refreshDataLoading: true });
    this.setState({ searchIzinKeyword: '' });
    this.getIzinHistory();
  }

  render() {
    return (
      <Container className="mt--8" fluid>
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
                <Form onSubmit={this.searchIzinHistory}>
                  <InputGroup className="mb-3">
                    <Input type="search" name="search" id="search" placeholder="Cari pegawai" onChange={e => {
                      this.setState({ searchIzinKeyword: e.target.value });
                    }} value={this.state.searchIzinKeyword} />
                    <InputGroupAddon addonType="append">
                      <LoadingButton type="submit" color="primary" condition={this.state.searchIzinLoading} disabled={!this.state.searchIzinKeyword}>Cari</LoadingButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
                <Form onSubmit={this.refreshData}>
                  <LoadingButton type="submit" color="success" className="mb-3" condition={this.state.refreshDataLoading}>
                    <span className="fas fa-undo mr-2"></span>
                    Muat Ulang Data
                  </LoadingButton>
                </Form>
                <CardsContainer 
                  data={this.state.izin}
                  card={(user, i) => (
                    <RiwayatIzinCard user={user} fadeInDelay={(i + 1) * 100} />
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