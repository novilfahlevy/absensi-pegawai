import React from 'react';

import Header from 'components/Headers/Header.jsx';
import Table from 'components/ui/Table.jsx';

import api from 'store/api.js';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';

import FadeIn from 'components/hoc/FadeIn.jsx';
import moment from 'moment';

class Absensi extends React.Component {
  state = {
    absensi: [],
    absenPhotoLightbox: null,
    searchKeyword: '',
  };

  componentDidMount() {
    this.getAbsensi('absensi');
  }

  toggleabsenPhotoLightbox(image) {
    this.setState({ absenPhotoLightbox: this.state.absenPhotoLightbox ? null : image });
  }

  getAbsensi(route) {
    api().get(route)
      .then(response => {
        const absensi = response.data.absensi.map((absensi, i) => ({
          ...absensi,
          nama: absensi.name,
          tanggal: moment(absensi.tanggal).format('D MMMM YYYY'),
          foto: (
            <Row>
              <Col className="col-6">
                {absensi.foto_absensi_masuk ? <img key={absensi.id} src={`${process.env.REACT_APP_BASE_URL}storage/attendances_photo/${absensi.foto_absensi_masuk}`} width="100%" height="50" onClick={() => this.toggleabsenPhotoLightbox(`${process.env.REACT_APP_BASE_URL}storage/attendances_photo/${absensi.foto_absensi_masuk}`)} style={{ cursor: 'pointer' }} alt="Foto Absen Masuk" /> : '-'}
              </Col>
              <Col className="col-6">
                {absensi.foto_absensi_keluar ? <img key={absensi.id} src={`${process.env.REACT_APP_BASE_URL}storage/attendances_photo/${absensi.foto_absensi_keluar}`} width="100%" height="50" onClick={() => this.toggleabsenPhotoLightbox(`${process.env.REACT_APP_BASE_URL}storage/attendances_photo/${absensi.foto_absensi_keluar}`)} style={{ cursor: 'pointer' }} alt="Foto Absen Keluar" /> : '-'}
              </Col>
            </Row>
          ),
          waktu_absensi: `${moment(`${absensi.tanggal} ${absensi.absensi_masuk}`).format('HH:mm')}${absensi.absensi_keluar ? ' - ' + moment(`${absensi.tanggal} ${absensi.absensi_keluar}`).format('HH:mm') : ''}`,
          opsi: (
            <Button color="primary" onClick={() => this.props.history.push(`detail-absensi/${absensi.id}`)}>
              <span className="fas fa-eye"></span>
            </Button>
          )
        }));
        this.setState({ absensi }, () => this.setState({ absensi: [...this.state.absensi] }));
      });
  }

  searchAbsensiChange = e => {
    this.setState({ searchKeyword: e.target.value });
  }

  searchAbsensiSubmit = e => {
    e.preventDefault();
    this.getAbsensi(`absensi/${this.state.searchKeyword}`);
  }

  refreshData() {
    this.getAbsensi('absensi');
    this.setState({ searchKeyword: '' });
  }

  render() {
    const columns = [
      {
        dataField: 'id',
        text: '#',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle',
        headerStyle: { width: '20px' }
      },
      {
        dataField: 'nama',
        text: 'Nama Pegawai',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle',
        sort: true
      },
      {
        dataField: 'waktu_absensi',
        text: 'Waktu Absensi',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle',
        sort: true
      },
      {
        dataField: 'foto',
        text: 'Foto',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle'
      },
      {
        dataField: 'opsi',
        text: 'Detail',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle'
      }
    ];

    return (
      <>
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col xs="6">
                      <h2 className="mb-0">Absensi Pegawai</h2>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Button color="primary" size="md" onClick={() => this.props.history.push('/admin/riwayat-absensi')}>
                        <i className="fas fa-list-ul mr-2"></i>
                        Riwayat Absensi
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.searchAbsensiSubmit}>
                    <InputGroup className="mb-3">
                      <Input type="search" name="search" id="search" placeholder="Cari nama pegawai" onChange={this.searchAbsensiChange} value={this.state.searchKeyword} />
                      <InputGroupAddon addonType="append">
                        <Button type="submit" color="primary">Cari</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                  <Row className="mb-3">
                    <Col>
                      <Button color="success" size="sm" onClick={() => this.refreshData()}>
                        <span className="fas fa-undo mr-1"></span>
                        Muat Ulang Data
                      </Button>
                    </Col>
                  </Row>    
                  <p className="text-muted text-sm">* Klik foto absen jika ingin melihat secara jelas.</p>
                  <Table
                    columns={columns}
                    data={this.state.absensi}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.state.absenPhotoLightbox && <Lightbox mainSrc={this.state.absenPhotoLightbox} onCloseRequest={() => this.setState({ absenPhotoLightbox: null })} />}
      </>
    );
  }
}

export default withRouter(FadeIn(Absensi, Header));