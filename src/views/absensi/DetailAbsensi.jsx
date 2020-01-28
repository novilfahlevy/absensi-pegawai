import React from 'react';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';

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

const AbsenLocation = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBi6BT_CluADbVAHO1oZv3nsmrbCxkfVsw",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))

class DetailAbsensi extends React.Component {
  state = {
    tanggal: null,
    jam_masuk: null,
    jam_pulang: null,
    keterangan: null,
    latitude_absen_masuk: 0,
    longitude_absen_masuk: 0,
    latitude_absen_keluar: 0,
    longitude_absen_keluar: 0,
    waktu_kerja: 0,
    isLembur: false
  }

  componentDidMount() {
    api(`lembur/${this.props.match.params.id}/cek`)
      .then(response => {
        if ( response.data.data ) {
          this.setState({ isLembur: true });
        }
      })

    api().get('admin/waktuKerja')
      .then(response => {
        this.setState({ waktu_kerja: response.data.data[0].waktu_kerja });
      })

    api().get(`absensi/${this.props.match.params.id}/detail`)
      .then(response => {
        const { 
          tanggal, 
          absensi_masuk, 
          absensi_keluar, 
          keterangan,
          latitude_absen_masuk,
          longitude_absen_masuk,
          latitude_absen_keluar,
          longitude_absen_keluar
        } = response.data.absensi;
        this.setState({
          tanggal,
          jam_masuk: absensi_masuk,
          jam_pulang: absensi_keluar,
          keterangan,
          latitude_absen_masuk: parseFloat(latitude_absen_masuk),
          longitude_absen_masuk: parseFloat(longitude_absen_masuk),
          latitude_absen_keluar: parseFloat(latitude_absen_keluar,),
          longitude_absen_keluar: parseFloat(longitude_absen_keluar)
        });
      });
  }

  render() {
    const { 
      tanggal, 
      jam_masuk, 
      jam_pulang, 
      keterangan, 
      foto_absensi_masuk, 
      foto_absensi_keluar,
      latitude_absen_masuk,
      longitude_absen_masuk,
      latitude_absen_keluar,
      longitude_absen_keluar,
      waktu_kerja
    } = this.state;

    const jam_masuk_absen = moment(`${tanggal} ${jam_masuk}`).format('HH:mm');
    const jam_pulang_absen = moment(`${tanggal} ${jam_pulang}`).format('HH:mm');

    const format_masuk = jam_masuk_absen.split(':');
    const format_pulang = jam_pulang_absen.split(':');

    const masuk_jam = format_masuk[0] && format_masuk[0].replace('0', '');
    // const masuk_menit = format_masuk[1] && format_masuk[1].replace('0', '');

    const pulang_jam = format_pulang[0] && format_pulang[0].replace('0', '');
    // const pulang_menit = format_pulang[1] && format_pulang[1].replace('0', '');

    let jumlah_jam_kerja = pulang_jam - masuk_jam;

    if ( jumlah_jam_kerja === waktu_kerja ) {
      jumlah_jam_kerja = 'Tepat Waktu';
    }
    else if ( jumlah_jam_kerja > waktu_kerja ) {
      jumlah_jam_kerja = 'Lewat Jam Kerja';
    }
    else {
      jumlah_jam_kerja = 'Lebih Awal';
    }

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
                          <p className="m-0">{jam_masuk_absen}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                          <h3>Jam Pulang</h3>
                          <p className="m-0">{jam_pulang_absen}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                          <h3>Keterangan Absen</h3>
                          <p className="m-0">
                            {keterangan}
                          </p>
                        </ListGroupItem>
                        {jam_pulang && (
                          <ListGroupItem>
                            <h3>Status</h3>
                            <p className="m-0">
                              {jumlah_jam_kerja}
                            </p>
                          </ListGroupItem>
                        )}
                      </ListGroup>
                      {this.state.isLembur && <Button className="mt-3" color="primary" onClick={() => this.props.history.push(`/admin/detail-lembur/${this.props.match.params.id}`)}>Lihat Keterangan Lembur</Button>}
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
                  {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwZyEkoZk2huhck8SO8b_hShfu6_a3tz7gsDfmzwjjiLS6iFpB" className="rounded" width="100%" height="300" /> */}
                  <Row>
                    <Col className="col-12">
                      <AbsenLocation lat={latitude_absen_masuk} lng={longitude_absen_masuk} />
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src={foto_absensi_masuk} />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardHeader>Absen Pulang</CardHeader>
                <CardBody>
                  <CardTitle><h2 className="m-0">Lokasi</h2></CardTitle>
                  <Row>
                    <Col className="col-12">
                      <AbsenLocation lat={latitude_absen_keluar} lng={longitude_absen_keluar} />
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src={foto_absensi_keluar} />
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