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
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Form
} from 'reactstrap';

import { withRouter } from 'react-router-dom';

import Table from 'components/ui/Table.jsx';
import LoadingButton from 'components/ui/LoadingButton.jsx';

class RiwayatAbsensi extends React.Component {
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
                          <LoadingButton color="success">
                            <span className="fas fa-undo mr-1"></span>
                            Muat Ulang Data
                          </LoadingButton>  
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Table 
                    columns={columns} 
                    data={[]}
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