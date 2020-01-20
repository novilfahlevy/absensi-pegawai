import React from 'react';

import Header from 'components/Headers/Header.jsx';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Badge
} from 'reactstrap';

import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import FadeIn from 'components/hoc/FadeIn.jsx';
import PermintaanLembur from './PermintaanLembur.jsx'
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Lembur extends React.Component {
  state = {
    modalIsOpen: false,
    lembur: Array(6).fill(null).map((a, i) => ({
      id: i + 1,
      tanggal: '2019-10-02',
      nama_pegawai: 'Muhammad Novil Fahlevy'.slice(0, 24) + "...",
      waktu: '08:30:00 - 16:15:00',
      total_waktu: '08:15:00',
      opsi: (
        <UncontrolledDropdown>
          <DropdownToggle size="sm">
            <i className="fas fa-ellipsis-v"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.deleteLembur(i + 1)} style={{ cursor: 'pointer' }}>
              <i className="fas fa-trash-alt text-danger"></i>
              Hapus
            </DropdownItem>
            <DropdownItem onClick={() => this.props.history.push('detail-Absensi')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-list-alt text-primary"></i>
              Lihat Detail Absensi
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }))
  };
  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }

  deleteLembur = id => {
    Swal.fire({
      title: 'Apa anda yakin?',
      text: "Data yang sudah dihapus tidak bisa dipulihkan kembali!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Gak jadi!',
      reverseButton: true
    }).then((result) => {
      if (result.value) {
        this.setState({ lembur: this.state.lembur.filter(l => l.id !== id) }, () => {
          Swal.fire(
            'Dihapus!',
            'Data sudah dihapus.',
            'success'
          )
        });
      }
    });
  };

  render() {
    const columns = [{
      dataField: 'id',
      text: '#',
      headerStyle: () => ({
        width: '20px',
        textAlign: 'center'
      }),
    }, {
      dataField: 'tanggal',
      text: 'Tanggal',
      headerAlign: 'center',
      align: 'center'
    }, {
      dataField: 'nama_pegawai',
      text: 'Nama Pegawai',
      headerAlign: 'center',
      align: 'left'
    }, {
      dataField: 'waktu',
      text: 'Waktu Kerja',
      headerAlign: 'center',
      align: 'center'
    }, {
      dataField: 'opsi',
      text: 'Opsi',
      headerStyle: () => {
        return { width: '70px', textAlign: 'center' };
      },
      align: 'center'
    }];

    return (
      <>
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h2 className="mb-0">Lembur</h2>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="primary" onClick={this.toggleModal} size="md">
                        Permintaan Lembur
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Row>
                      <Col lg={12} sm={12} className="col-6 col-sm-12">
                        <CardTitle className="mb-2">
                          <Row>
                            <Col lg={8}>
                              <h2>Fadhil Dhanendra</h2>
                            </Col>
                            <Col lg={4} className="text-right">
                              <span className="font-weight-bold d-block">28 Januari, 2019</span>
                              <span className="font-weight-bold">20:00</span> - <span className="font-weight-bold">22:00</span>
                            </Col>
                          </Row>
                        </CardTitle>
                        <CardText>
                          <span className="font-weight-bold d-block mt-lg-4">Keterangan : </span>
                          <p className="m-0">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque aliquam laudantium facilis consequatur enim vel nisi amet! Dolor, facilis corporis?</p>
                        </CardText>
                      </Col>
                      <Col lg={12} sm={12} className="col-6 col-sm-12 d-flex justify-content-sm-start justify-content-lg-end align-items-center">
                        <h2><Badge href="#" color="danger">Ditolak</Badge></h2>
                      </Col>
                    </Row>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <PermintaanLembur modal={this.state.modalIsOpen} toggle={this.toggleModal} />
        </Container>

      </>
    );
  }
}

export default withRouter(FadeIn(Lembur, Header));