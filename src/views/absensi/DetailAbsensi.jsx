import React from 'react';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardTitle,
  CardBody, 
  CardHeader, 
  CardFooter,
  Button, 
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import api from 'store/api.js';
import moment from 'moment';

class AbsenLocation extends React.Component {
  state = {
    viewport: {
      width: '100%',
      height: 300,
      latitude: 0,
      longitude: 0,
      zoom: 17
    },
    markerLatitude: 0,
    markerLongitude: 0
  };

  componentDidMount() {
    this.setMapCenter();
  }

  componentWillReceiveProps() {
    this.setMapCenter();
  }

  setMapCenter() {
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: this.props.lat,
        longitude: this.props.lng
      },
      markerLatitude: this.props.lat,
      markerLongitude: this.props.lng
    }, () => {
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: this.props.lat,
          longitude: this.props.lng
        },
        markerLatitude: this.props.lat,
        markerLongitude: this.props.lng
      })
    });
  }

  render() {
    return (
      <Card className="p-2">
        <CardBody>
          <MapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            className="rounded"
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({ viewport })}
          >
            <div style={{ position: 'absolute', right: 0 }}>
              <NavigationControl />
            </div>
            <Marker 
              latitude={this.state.markerLatitude} 
              longitude={this.state.markerLongitude} 
              offsetLeft={0} 
              offsetTop={0}
            >
              <span className="fas fa-map-marker-alt" style={{ fontSize: '40px' }}></span>
            </Marker>
          </MapGL>
        </CardBody>
        <CardFooter className="py-3">
          <Row>
            <Col lg="6">
              <p className="m-0">Lat: {this.state.viewport.latitude.toString().slice(0, 14)}</p>
              <p className="m-0">Lng: {this.state.viewport.longitude.toString().slice(0, 14)}</p>
            </Col>
            <Col lg="6">
              <div className="d-flex justify-content-end">
                <Button color="success" size="lg" onClick={() => this.setMapCenter()}>
                  <span className="fas fa-map-marker-alt text-lg"></span>
                </Button>
              </div>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

class DetailAbsensi extends React.Component {
  state = {
    user_id: null,
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
    api().get(`lembur/${this.props.match.params.id}/cek`)
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
          user_id,
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
          user_id,
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
      user_id,
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
                      <Button color="primary" onClick={() => this.props.history.push(`/admin/detail-pegawai/${user_id}`)}>
                        <i className="fas fa-user mr-1"></i>
                        Detail Pegawai
                      </Button>
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
                          <p className="m-0">{jam_pulang_absen || '-'}</p>
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
                  <Row>
                    <Col className="col-12">
                      <AbsenLocation lat={latitude_absen_masuk} lng={longitude_absen_masuk} />
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src={`${process.env.REACT_APP_BASE_URL}/storage/absensi/${foto_absensi_masuk}`} alt="Foto Absen Masuk" />
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
                  <img src={`${process.env.REACT_APP_BASE_URL}/storage/absensi/${foto_absensi_keluar}`} alt="Foto Absen Keluar" />
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
