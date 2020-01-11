import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Button
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';

class JamKerja extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col lg="12" className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6} className="col-12">
                      <CardTitle><h2>Waktu Kerja</h2></CardTitle>
                      <Row>
                        <Col lg="6" className="col-12">
                          <FormGroup>
                            <Label for="waktu_kerja_datang">Datang</Label>
                            <Input type="time" name="waktu_kerja_datang" id="waktu_kerja_datang" />
                          </FormGroup>
                        </Col>
                        <Col lg="6" className="col-12">
                          <FormGroup>
                            <Label for="waktu_kerja_pulang">Pulang</Label>
                            <Input type="time" name="waktu_kerja_pulang" id="waktu_kerja_pulang" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <CardTitle><h2>Istirahat</h2></CardTitle>
                      <Row>
                        <Col lg="6" className="col-12">
                          <FormGroup>
                            <Label for="istirahat_mulai">Mulai</Label>
                            <Input type="time" name="istirahat_mulai" id="istirahat_mulai" />
                          </FormGroup>
                        </Col>
                        <Col lg="6" className="col-12">
                          <FormGroup>
                            <Label for="istirahat_selesai">Selesai</Label>
                            <Input type="time" name="istirahat_selesai" id="istirahat_selesai" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} className="col-12">
                      <CardTitle><h2>Hari Kerja</h2></CardTitle>
                      <FormGroup>
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="senin" value="Senin" label="Senin" />
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="selasa" value="Selasa" label="Selasa" />
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="rabu" value="Rabu" label="Rabu" />
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="kamis" value="Kamis" label="Kamis" />
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="jumat" value="Jumat" label="Jumat" />
                        <CustomInput className="mb-2" type="checkbox" name="hari_kerja" id="sabtu" value="Sabtu" label="Sabtu" />
                      </FormGroup>
                    </Col>
                    <Col lg={12} className="col-12">
                      <Row>
                        <Col lg={6} className="col-6">
                          <Card className="mb-3">
                            <CardBody>
                              <CardTitle><h2>Akumulasi Jam Kerja</h2></CardTitle>
                              <CardText><span className="font-weight-bold">8</span> Jam</CardText>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg={6} className="col-6">
                          <Card className="mb-3">
                            <CardBody>
                              <CardTitle><h2>Hari Kerja</h2></CardTitle>
                              <CardText><span className="font-weight-bold">Senin, selasa, rabu, kamis, jumat, sabtu</span> </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} className="col-12">
                      <Button color="primary" >Atur jam Kerja</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default JamKerja;