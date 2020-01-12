import React from 'react';

import Header from 'components/Headers/Header.jsx';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  UncontrolledDropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle 
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Lembur extends React.Component {
  state = {
    lembur: Array(6).fill(null).map((a, i) => ({
      id: i+1,
      tanggal: '2019-10-02',
      nama_pegawai: 'Muhammad Novil Fahlevy'.slice(0, 24) + "...",
      waktu_mulai: '08:30:00',
      waktu_selesai: '16:15:00',
      total_waktu: '08:15:00',
      opsi: (
        <UncontrolledDropdown>
          <DropdownToggle size="sm">
            <i className="fas fa-ellipsis-v"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.deleteLembur(i+1)} style={{ cursor: 'pointer' }}>
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
      align: 'center'
    }, {
      dataField: 'nama_pegawai',
      text: 'Nama Pegawai',
      align: 'left'
    }, {
      dataField: 'waktu_mulai',
      text: 'Waktu Mulai',
      align: 'center'
    }, {
      dataField: 'waktu_selesai',
      text: 'Waktu Selesai',
      headerAlign: 'center',
      align: 'center'
    }, {
      dataField: 'total_waktu',
      text: 'Total Waktu',
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
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h2 className="m-0">Lembur</h2>
                </CardHeader>
                <CardBody>
                  <BootstrapTable 
                    keyField="id" 
                    columns={columns} 
                    data={this.state.lembur} 
                    // pagination={paginationFactory()}
                  />
                </CardBody>
              </Card> 
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Lembur);