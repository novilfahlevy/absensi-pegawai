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

class Lembur extends React.Component {
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
      headerStyle: () => ({
        width: '100px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'nama_pegawai',
      text: 'Nama Pegawai',
      headerStyle: () => ({
        width: '200px',
        textAlign: 'center'
      }),
      align: 'left'
    }, {
      dataField: 'waktu_mulai',
      text: 'Waktu Mulai',
      headerStyle: () => ({
        width: '120px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'waktu_selesai',
      text: 'Waktu Selesai',
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
    }];

    let opsi = (
      <UncontrolledDropdown>
        <DropdownToggle size="sm">
          <i className="fas fa-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem style={{ cursor: 'pointer' }}>
            <i className="fas fa-trash-alt text-danger"></i>
            Hapus
          </DropdownItem>
          <DropdownItem style={{ cursor: 'pointer' }}>
            <i className="fas fa-list-alt text-primary"></i>
            Lihat Detail Absensi
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
    
    const products = Array(6).fill(null).map((a, i) => ({
      id: i+1,
      tanggal: '2019-10-02',
      nama_pegawai: 'Muhammad Novil Fahlevy'.slice(0, 24) + "...",
      waktu_mulai: '08:30:00',
      waktu_selesai: '16:15:00',
      total_waktu: '08:15:00',
      opsi
    }));

    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col>
                      <h2 className="m-0">Lembur</h2>
                    </Col>
                    <Col className="text-right">
                      <Button color="primary" onClick={() => this.props.history.push('permintaan-lembur')}>Permintaan Lembur</Button>
                    </Col>
                  </Row>
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

export default withRouter(Lembur);