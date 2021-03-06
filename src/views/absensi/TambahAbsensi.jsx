import React from 'react';

import Header from 'components/Headers/Header.jsx';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardTitle,
  CardBody, 
  CardHeader, 
  Button, 
  // UncontrolledDropdown, 
  // DropdownItem, 
  // DropdownMenu, 
  // DropdownToggle
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class TambahAbsensi extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col lg="7">
              <Card className="mb-3">
                <CardHeader>
                  <h2 className="m-0">Tambah Absensi</h2>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <Input type="date" name="tanggal" id="tanggal" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="jam_masuk">Jam Masuk</Label>
                    <Input type="time" name="jam_masuk" id="jam_masuk" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="jam_pulang">Jam Pulang</Label>
                    <Input type="time" name="jam_pulang" id="jam_pulang" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="keterangan_absen">Keterangan Absen</Label>
                    <Input type="textarea" name="keterangan_absen" id="keterangan_absen" rows={6} />
                  </FormGroup>
                  <Button color="primary">Absen</Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5">
              <Card>
                <Row>
                  <Col md="6" lg="12">
                    <CardBody>
                      <CardTitle><h2 className="m-0">Lokasi</h2></CardTitle>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwZyEkoZk2huhck8SO8b_hShfu6_a3tz7gsDfmzwjjiLS6iFpB" className="rounded" width="100%" height="300" />
                    </CardBody>
                  </Col>
                  <Col md="6" lg="12">
                    <CardBody>
                      <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtz3bf4yWpyod9EajS3TYr7VknQgyFw1fZhiYL3ZF5AFcvpXAC" className="rounded img-thumbnail" width="100%" height="300" />
                      <Button color="primary" className="mt-3 w-100">Foto</Button>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TambahAbsensi;