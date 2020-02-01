import React from 'react';

import Header from 'components/Headers/Header.jsx';
import api from 'store/api.js';
import moment from 'moment';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Form
} from 'reactstrap';

import { withRouter } from 'react-router-dom';

import Table from 'components/ui/Table.jsx';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import Lightbox from 'react-image-lightbox';

class RiwayatAbsensi extends React.Component {
  state = {
    absensi: [],
    absenPhotoLightbox: null,
    filterYear: new Date().getFullYear(),
    filterMonth: moment().month(),
    filterLoading: false,
    refreshDataLoading: false,
    searchLoading: false
  };

  componentDidMount() {
    this.getDataAbsensi();
  }

  getDataAbsensi(callback) {
    api().get('absensi/riwayat')
    .then(response => {
      this.setState({ absensi: response.data.data }, () => {
        this.setState({ 
          absensi: this.state.absensi.map(absen => this.setDataAbsensi(absen)) 
        }, callback);
      });
    });
  }

  setDataAbsensi(absen) {
    return {
      ...absen,
      nama: absen.name,
      tanggal: moment(absen.tanggal).format('D MMMM YYYY'),
      foto: (
        <Row>
          <Col className="col-6">
            <img key={absen.id} src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${absen.foto_absensi_masuk}`} width="100%" height="100%" onClick={() => this.toggleAbsenPhotoLightbox(`${process.env.REACT_APP_BASE_URL}storage/profiles/${absen.foto_absensi_masuk}`)} style={{ cursor: 'pointer' }} alt="Foto Absen Masuk" />
          </Col>
          <Col className="col-6">
            <img key={absen.id} src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${absen.foto_absensi_keluar}`} width="100%" height="100%" onClick={() => this.toggleAbsenPhotoLightbox(`${process.env.REACT_APP_BASE_URL}storage/profiles/${absen.foto_absensi_keluar}`)} style={{ cursor: 'pointer' }} alt="Foto Absen Keluar" />
          </Col>
        </Row>
      ),
      waktu_absensi: `${moment(`${absen.tanggal} ${absen.absensi_masuk}`).format('HH:mm')}${absen.absensi_keluar ? ' - ' + moment(`${absen.tanggal} ${absen.absensi_keluar}`).format('HH:mm') : ''}`,
      opsi: (
        <Button color="primary" onClick={() => this.props.history.push(`detail-absensi/${absen.id}`)}>
          <span className="fas fa-eye"></span>
        </Button>
      )
    };
  }

  filterData = e => {
  }
  
  refreshData = () => {
    this.setState({ refreshDataLoading: true });
    this.getDataAbsensi(() => this.setState({ refreshDataLoading: false }));
  }

  toggleAbsenPhotoLightbox(image) {
    this.setState({ absenPhotoLightbox: this.state.absenPhotoLightbox ? null : image });
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
        dataField: 'name',
        text: 'Nama Pegawai',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle',
        sort: true
      },
      {
        dataField: 'tanggal',
        text: 'Tanggal',
        align: 'center',
        classes: 'align-middle',
        headerAlign: 'center',
        headerClasses: 'align-middle'
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
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h2 className="m-0">Riwayat Absensi</h2>
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
                      <Form>
                        <InputGroup className="mb-3">
                          <CustomInput type="search" className="form-control" name="cariKeyword" id="search" placeholder="Cari nama pegawai" />
                          <InputGroupAddon addonType="append">
                            <Button type="submit" color="primary">Cari</Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </Form>
                    </Col>
                    <Col>
                      <Row className="mb-3">
                        <Col sm="12" lg="3" className="mb-3 mb-lg-0">
                          <CustomInput type="select" className="form-control" id="tahun" name="tahun">
                            <option value="2020">2020</option>
                          </CustomInput>                  
                        </Col>
                        <Col sm="12" lg="3" className="mb-3 mb-lg-0">
                          <CustomInput type="select" className="form-control" id="bulan" name="bulan">
                            <option value="Januari">Januari</option>
                          </CustomInput>                  
                        </Col>
                        <Col className="d-flex align-items-center justify-content-between">
                          <LoadingButton color="primary">
                            <span className="fas fa-filter mr-1"></span>
                            Filter
                          </LoadingButton>  
                          <Form onSubmit={e => { e.preventDefault(); this.refreshData(); }}>
                            <LoadingButton type="submit" color="success" condition={this.state.refreshDataLoading}>
                              <span className="fas fa-undo mr-1"></span>
                              Muat Ulang Data
                            </LoadingButton>  
                          </Form>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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

export default withRouter(RiwayatAbsensi);