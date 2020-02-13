import React from 'react';

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input
} from 'reactstrap';

class AbsenMasuk extends React.Component {
  render() {
    return (
      <Row>
        <Col className="col-12">
          <FormGroup>
            <Label htmlFor="user">User</Label>
            <CustomInput type="text" className="form-control" name="user" id="user" />
          </FormGroup>
        </Col>
        <Col className="col-12">
          <FormGroup>
            <Label htmlFor="tanggal">Tanggal</Label>
            <CustomInput type="date" className="form-control" name="tanggal" id="tanggal" />
          </FormGroup>
        </Col>
        <Col className="col-12">
          <FormGroup>
            <Label htmlFor="jamMasuk">Jam Absen</Label>
            <CustomInput type="time" className="form-control" name="jam_masuk" id="jamMasuk" />
          </FormGroup>
        </Col>
        <Col className="col-12">
          <FormGroup>
            <Label htmlFor="keterangan">Keterangan</Label>
            <Input type="textarea" className="form-control" name="keterangan" id="keterangan" />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

class AbsenKeluar extends React.Component {
  render() {
    return (
      <h1>Absen Keluar</h1>
    );
  }
}

class AbsenByAdmin extends React.Component {
  state = {
    absen: true
  };

  toggleAbsen(absenMasuk) { 
    this.setState({ absen: absenMasuk });
  }

  render() {
    return (
      <Modal {...this.props}>
        <ModalHeader toggle={this.props.toggle}>
          <span className="text-lg">Absen Pegawai</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="col-6 d-flex justify-content-center">
              <Button color={this.state.absen && "primary"} className="w-100" onClick={() => {
                this.toggleAbsen(true);
              }}>
                Absen Masuk
              </Button>
            </Col>
            <Col className="col-6 d-flex justify-content-center">
              <Button color={!this.state.absen && "primary"} className="w-100" onClick={() => {
                this.toggleAbsen(false);
              }}>
                Absen Keluar
              </Button>
            </Col>
          </Row>
          <div className="mt-4">
            {this.state.absen ? <AbsenMasuk /> : <AbsenKeluar />}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.toggle}>Cancel</Button>
          <Button color="success">Absen</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AbsenByAdmin;