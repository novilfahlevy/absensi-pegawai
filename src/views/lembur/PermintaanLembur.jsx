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

import { withRouter, Link } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class PermintaanLembur extends React.Component {
  render() {
    console.log(this.props);

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
        return { width: '80px', textAlign: 'center' };
      },
      align: 'center'
    }];
    
    const products = Array(6).fill(null).map((a, i) => ({
      id: i+1,
      tanggal: '2019-10-02',
      nama_pegawai: <Link to="/admin/detail-absensi/1">{'Muhammad Novil Fahlevy'.slice(0, 24) + "..."}</Link>,
      waktu_mulai: '08:30:00',
      waktu_selesai: '16:15:00',
      total_waktu: '08:15:00',
      opsi: (
        <>
          <Button color="success" size="sm">
            <i className="fas fa-check"></i>
          </Button>
          <Button color="danger" size="sm">
            <i className="fas fa-times"></i>
          </Button>
        </>
      )
    }));

    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h2 className="m-0">Permintaan Lembur</h2>
                </CardHeader>
                <CardBody>
                  <BootstrapTable 
                    keyField="id" 
                    columns={columns} 
                    data={products} 
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

export default withRouter(PermintaanLembur);