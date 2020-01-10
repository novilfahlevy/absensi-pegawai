import React, { useState } from 'react';

import Header from 'components/Headers/Header.jsx';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Button, 
  UncontrolledDropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle 
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Absensi extends React.Component {
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
      dataField: 'nama_pegawai',
      text: 'Nama Pegawai',
      headerStyle: () => ({
        width: '200px',
        textAlign: 'center'
      }),
      align: 'left'
    }, {
      dataField: 'waktu_masuk',
      text: 'Waktu Masuk',
      headerStyle: () => ({
        width: '120px',
        textAlign: 'center'
      }),
      align: 'center'
    }, {
      dataField: 'waktu_pulang',
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
    }];

    let opsi = (
      <UncontrolledDropdown>
        <DropdownToggle size="sm">
          <i class="fas fa-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem style={{ cursor: 'pointer' }}>
            <i class="fas fa-trash-alt text-danger"></i>
            Delete
          </DropdownItem>
          <DropdownItem style={{ cursor: 'pointer' }}>
            <i class="fas fa-pencil-alt text-success"></i>
            Edit
          </DropdownItem>
          <DropdownItem style={{ cursor: 'pointer' }}>
            <i class="fas fa-eye text-primary"></i>
            View
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
    
    const products = Array(6).fill(null).map((a, i) => (
      {
        id: i+1,
        tanggal: '2019-10-02',
        nama_pegawai: 'Muhammad Novil Fahlevy'.slice(0, 24) + "...",
        waktu_masuk: '08:30:00',
        waktu_pulang: '16:15:00',
        total_waktu: '08:15:00',
        opsi
      }
    ));

    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
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

export default Absensi;