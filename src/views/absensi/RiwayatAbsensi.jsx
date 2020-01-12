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

import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

import Swal from 'sweetalert2';

class RiwayatAbsensi extends React.Component {
  state = {
    absensi: Array(6).fill(null).map((a, i) => ({
      id: i+1,
      tanggal: '2019-10-02',
      jam_masuk: '08:30:00',
      jam_pulang: '16:15:00',
      total_waktu: '08:15:00',
      opsi: (
        <UncontrolledDropdown>
          <DropdownToggle size="sm">
            <i className="fas fa-ellipsis-v"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.deleteAbsen(i+1)} style={{ cursor: 'pointer' }}>
              <i className="fas fa-trash-alt text-danger"></i>
              Delete
            </DropdownItem>
            <DropdownItem onClick={() => this.props.history.push('detail-absensi')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-eye text-primary"></i>
              View
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
      status: Math.round(Math.random())
    }))
  };

  deleteAbsen = id => {
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
          this.setState({
            absensi: this.state.absensi.filter(absen => absen.id !== id)
          }, () => {
            Swal.fire(
              'Dihapus!',
              'Absensi sudah dihapus.',
              'success'
            )
          });
        }
    })
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
      headerStyle: () => ({
        width: '100px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'jam_masuk',
      text: 'Waktu Masuk',
      headerStyle: () => ({
        width: '120px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'jam_pulang',
      text: 'Waktu Pulang',
      headerAlign: 'center',
      headerStyle: () => ({
        width: '120px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'total_waktu',
      text: 'Total Waktu',
      headerAlign: 'center',
      headerStyle: () => ({
        width: '120px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'opsi',
      text: 'Opsi',
      headerStyle: () => {
        return { width: '80px', textAlign: 'center' };
      },
      align: 'center'
    }, {
      dataField: 'status',
      text: 'Status',
      hidden: true
    }];

    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h2 className="m-0">Riwayat Absensi</h2>
                </CardHeader>
                <CardBody>
                  <BootstrapTable 
                    keyField="id" 
                    columns={columns} 
                    data={this.state.absensi}
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

export default withRouter(RiwayatAbsensi);