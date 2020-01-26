import React from 'react';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardTitle,
  CardBody, 
  CardHeader, 
  Button, 
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import api from 'store/api.js';
import moment from 'moment';

class DetailAbsensi extends React.Component {
  state = {
    absen: {
      tanggal: null,
      jam_masuk: null,
      jam_pulang: null,
      keterangan: null,
      lokasi: {
        masuk: null,
        pulang: null
      },
      foto: {
        masuk: null,
        pulang: null
      }
    },
    lembur: {
      tanggal: null,
      jam_mulai: null,
      jam_selesai: null,
      keterangan: null
    }
  }

  componentDidMount() {
    api().get(`absensi/${this.props.match.params.id}/detail`)
      .then(response => {
        const { tanggal, absensi_masuk, absensi_keluar, keterangan } = response.data.absensi;
        this.setState({
          absen: {
            tanggal,
            jam_masuk: absensi_masuk,
            jam_pulang: absensi_keluar,
            keterangan
          }
        });
      });
  }

  render() {
    const { tanggal, jam_masuk, jam_pulang, keterangan } = this.state.absen;

    return (
      <>
        <Container className="mt--7">
          <Row>
            <Col>
              <Card className="mb-3">
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h2 className="m-0">Detail Absensi</h2>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="primary" onClick={() => this.props.history.goBack()}>
                        <i className="fas fa-arrow-left"></i>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="col-12">
                      <ListGroup>
                        <ListGroupItem>
                          <h3>Tanggal</h3>
                          <p className="m-0">{moment(tanggal).format('D MMMM YYYY')}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                          <h3>Jam Masuk</h3>
                          <p className="m-0">{moment(`${tanggal} ${jam_masuk}`).format('HH:mm')}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                          <h3>Jam Pulang</h3>
                          <p className="m-0">{moment(`${tanggal} ${jam_pulang}`).format('HH:mm')}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                          <h3>Keterangan Absen</h3>
                          <p className="m-0">
                            {keterangan}
                          </p>
                        </ListGroupItem>
                      </ListGroup>
                      <Button className="mt-3" color="primary">Lihat Keterangan Lembur</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card>
                <CardHeader>Absen Masuk</CardHeader>
                <CardBody>
                  <CardTitle><h2 className="m-0">Lokasi</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwZyEkoZk2huhck8SO8b_hShfu6_a3tz7gsDfmzwjjiLS6iFpB" className="rounded" width="100%" height="300" />
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtz3bf4yWpyod9EajS3TYr7VknQgyFw1fZhiYL3ZF5AFcvpXAC" className="rounded img-thumbnail" />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardHeader>Absen Pulang</CardHeader>
                <CardBody>
                  <CardTitle><h2 className="m-0">Lokasi</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwZyEkoZk2huhck8SO8b_hShfu6_a3tz7gsDfmzwjjiLS6iFpB" className="rounded" width="100%" height="300" />
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtz3bf4yWpyod9EajS3TYr7VknQgyFw1fZhiYL3ZF5AFcvpXAC" className="rounded img-thumbnail" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(FadeIn(DetailAbsensi, Header));