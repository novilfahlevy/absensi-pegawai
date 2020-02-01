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
import FadeIn from 'components/hoc/FadeIn.jsx';

class RiwayatAbsensi extends React.Component {
  state = {
    absensi: [],
    absenPhotoLightbox: null,
    filterYears: [],
    filterYear: 'all',
    filterMonth: 'all',
    filterLoading: false,
    refreshDataLoading: false,
    searchLoading: false,
    searchKeyword: ''
  };

  componentDidMount() {
    moment.locale('id');
    this.getDataAbsensi();
  }

  getDataAbsensi(callback) {
    api().get('absensi/riwayat')
    .then(response => {
      this.setState({ absensi: response.data.data }, () => {
        this.setFilterYears();
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

  searchData = e => {
    e.preventDefault();
    this.setState({ searchLoading: true });
    api().get(`absensi/riwayat/search/${this.state.searchKeyword}`)
    .then(response => {
      this.setState({ absensi: response.data.data }, () => {
        this.setState({ absensi: this.state.absensi.map(absen => this.setDataAbsensi(absen)) }, () => {
          this.setState({ searchLoading: false });
        });
      });
    })
    .catch(err => this.setState({ searchLoading: false }));
  }
  
  changeSearchKeyword = e => {
    this.setState({ searchKeyword: e.target.value });
  }
  
  refreshData = () => {
    this.setState({ refreshDataLoading: true });
    this.getDataAbsensi(() => this.setState({ refreshDataLoading: false }));
  }

  filterData = e => {
    e.preventDefault();
    this.setState({ filterLoading: true });
    api().get(`absensi/riwayat/filter/${this.state.filterYear}/${this.state.filterMonth}`)
    .then(response => {
      this.setState({ absensi: response.data.data }, () => {
        this.setState({ absensi: this.state.absensi.map(absen => this.setDataAbsensi(absen)) }, () => {
          this.setState({ filterLoading: false });
        });
      });
    })
    .catch(err => console.log(err.response))
  }
  
  setFilterYears() {
    api().get('absensi/riwayat/years')
    .then(response => this.setState({ filterYears: response.data.data }));
  }
  
  changeFilterYear = e => {
    this.setState({ filterYear: e.target.value });
  }
  
  changeFilterMonth = e => {
    this.setState({ filterMonth: e.target.value });
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
                      <Form onSubmit={this.searchData}>
                        <InputGroup className="mb-3">
                          <CustomInput type="search" className="form-control" name="cariKeyword" id="search" placeholder="Cari nama pegawai" onChange={this.changeSearchKeyword} />
                          <InputGroupAddon addonType="append">
                            <LoadingButton type="submit" condition={this.state.searchLoading} color="primary" disabled={!this.state.searchKeyword.length}>Cari</LoadingButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </Form>
                    </Col>
                    <Col>
                      <Row className="mb-3">
                        <Col sm="12" lg="3" className="mb-3 mb-lg-0">
                          <CustomInput type="select" className="form-control" id="tahun" name="tahun" onChange={this.changeFilterYear}>
                            <option value="all">Pilih Semua Tahun</option>
                            {this.state.filterYears.map((year, i) => (
                              <option key={i} value={year}>{year}</option>
                            ))}
                          </CustomInput>                  
                        </Col>
                        <Col sm="12" lg="3" className="mb-3 mb-lg-0">
                          <CustomInput type="select" className="form-control" id="bulan" name="bulan" onChange={this.changeFilterMonth}>
                            <option value="all">Pilih Semua Bulan</option>
                            {[...Array(12).fill(null)].map((month, i) => (
                              <option key={i} value={i + 1}>{moment().months(i).format('MMMM')}</option>
                            ))}
                          </CustomInput>                  
                        </Col>
                        <Col className="d-flex align-items-center justify-content-between">
                          <Form onSubmit={this.filterData}>
                            <LoadingButton type="submit" condition={this.state.filterLoading} color="primary">
                              <span className="fas fa-filter mr-1"></span>
                              Filter
                            </LoadingButton>  
                          </Form>
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

export default withRouter(FadeIn(RiwayatAbsensi, Header));