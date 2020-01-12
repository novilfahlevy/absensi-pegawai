import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';

class PengajuanLembur extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle><h2 className="m-0">Pengajuan Lembur</h2></CardTitle>
                  <FormGroup>
                    <Label for="tanggal">Tanggal</Label>
                    <Input type="date" name="tanggal" id="tanggal" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="waktu_selesai">Waktu Selesai</Label>
                    <Input type="time" name="waktu_selesai" id="waktu_selesai" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="keterangan">Keterangan</Label>
                    <Input type="textarea" name="keterangan" id="keterangan" rows="5" />
                  </FormGroup>
                  <Button color="primary">Ajukan Lembur</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PengajuanLembur;