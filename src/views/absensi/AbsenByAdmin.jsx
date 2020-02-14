import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Pagination from 'react-js-pagination';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  UncontrolledAlert,
  Form,
  FormFeedback
} from 'reactstrap';

class AbsenMasuk extends React.Component {
  state = {
    selectUserModal: false
  };

  toggleSelectUserModal = () => {
    this.setState({ selectUserModal: !this.state.selectUserModal });
  }

  render() {
    const absenMasukSchema = Yup.object().shape({
      tanggal: Yup.string()
        .required('Masukan tanggal absensi'),
      jamAbsen: Yup.string()
        .required('Masukan jam absensi')
    })

    return (
      <>
        <Formik
          initialValues={{
            tanggal: '',
            jamAbsen: ''
          }}
          validationSchema={absenMasukSchema}
          onSubmit={data => {
            alert();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
              <Col className="col-12">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" width="80" height="80" className="mr-4 rounded" alt="User Absen" />
                    <CardTitle className="m-0">
                      <p className="m-0">Eddy Gunawan</p>
                    </CardTitle>
                  </CardBody>
                </Card>
                <Button color="primary" className="mt-3 w-100" onClick={this.toggleSelectUserModal}>Pilih User</Button>
                <hr className="mb-3 mt-4" />
              </Col>
              <Col className="col-12">
                <UncontrolledAlert className="mb-3" color="danger">
                  User 'Eddy Gunawan' telah melakukan absen masuk pada hari Selasa, 27 Januari 2020.
                </UncontrolledAlert>
                <FormGroup>
                  <Label htmlFor="tanggal">Tanggal</Label>
                  <CustomInput type="date" className="form-control" name="tanggal" id="tanggal" onChange={handleChange} />
                  {errors.tanggal && touched.tanggal ? (
                    <FormFeedback className="d-block">{errors.tanggal}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col className="col-12">
                <FormGroup>
                  <Label htmlFor="jamAbsen">Jam Absen</Label>
                  <CustomInput type="time" className="form-control" name="jamAbsen" id="jamAbsen" onChange={handleChange} />
                  {errors.jamAbsen && touched.jamAbsen ? (
                    <FormFeedback className="d-block">{errors.jamAbsen}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col className="col-12">
                <FormGroup>
                  <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
                  <Input type="textarea" className="form-control" name="keterangan" id="keterangan" />
                </FormGroup>
                <Button color="primary">Absen</Button>
              </Col>
            </Row>
            </Form>
          )}
        </Formik>
        <ModalUserAbsenMasuk isOpen={this.state.selectUserModal} toggle={this.toggleSelectUserModal} />
      </>
    );
  }
}

class AbsenKeluar extends React.Component {
  state = {
    selectAbsenModal: false
  }

  toggleSelectAbsenModal = () => {
    this.setState({ selectAbsenModal: !this.state.selectAbsenModal });
  }

  render() {
    const absenKeluarSchema = Yup.object().shape({
      jamAbsen: Yup.string()
        .required('Masukan jam absensi')
    })

    return (
      <>
        <Formik
          initialValues={{
            jamAbsen: ''
          }}
          validationSchema={absenKeluarSchema}
          onSubmit={data => {
            alert();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody className="p-0 d-flex align-items-center">
                      <img src="https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" width="80" height="80" className="mr-4 rounded" alt="User Absen" />
                      <CardTitle className="m-0">
                        <p className="m-0">Eddy Gunawan</p>
                        <p className="m-0 small text-muted">Selasa, 12 Januari 2020</p>
                      </CardTitle>
                    </CardBody>
                  </Card>
                  <Button color="primary" className="mt-3 w-100" onClick={this.toggleSelectAbsenModal}>Pilih Absen</Button>
                  <hr className="mb-3 mt-4" />
                </Col>
                <Col className="col-12">
                  <FormGroup>
                    <Label htmlFor="jamAbsen">Jam Absen</Label>
                    <CustomInput type="time" className="form-control" name="jamAbsen" id="jamAbsen" onChange={handleChange} />
                    {errors.jamAbsen && touched.jamAbsen ? (
                      <FormFeedback className="d-block">{errors.jamAbsen}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col className="col-12">
                  <FormGroup>
                    <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
                    <Input type="textarea" className="form-control" name="keterangan" id="keterangan" />
                  </FormGroup>
                  <Button color="primary">Absen</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <ModalUserAbsenKeluar isOpen={this.state.selectAbsenModal} toggle={this.toggleSelectAbsenModal} />          
      </>
    );
  }
}

class ModalUserAbsenMasuk extends React.Component {
  state = {
    pagination: {
      start: 0,
      limit: 6,
      activePage: 1
    }
  };

  render() {
    const { start, limit, activePage } = this.state.pagination;
    return (
      <Modal size="lg" {...this.props}>
        <ModalHeader toggle={this.props.toggle}>
          <span className="text-lg">Pilih User</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <InputGroup>
                <CustomInput type="search" className="form-control" name="user" id="user" placeholder="Cari nama user" />
                <InputGroupAddon addonType="append">
                  <Button color="primary">Cari</Button>
                </InputGroupAddon>
              </InputGroup>
              <Button className="mt-3" size="sm" color="success">
                <span className="fas fa-undo mr-2"></span>
                Muat Ulang Data
              </Button>
              <hr className="my-3" />
            </Col>
          </Row>
          <Row>
            {[...Array(12).fill(null)].slice(start, start + limit).map((a, i) => (
              <Col className="mb-4" lg="6">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" width="100" height="70" className="mr-4 rounded" alt="User Absen" />
                    <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                      <CardTitle className="m-0">
                        <p className="m-0">Eddy Gunawan</p>
                      </CardTitle>
                      <Button color="success" size="sm">Pilih</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter className="mt--4">
          <Pagination
            totalItemsCount={12}
            onChange={activePage => {
              const { limit } = this.state.pagination;
              this.setState({ 
                pagination: {
                  ...this.state.pagination,
                  start: (limit * activePage) - limit,
                  activePage 
                }
              });
            }}
            activePage={activePage}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
          />
        </ModalFooter>
      </Modal>
    );
  }
}

class ModalUserAbsenKeluar extends React.Component {
  state = {
    pagination: {
      start: 0,
      limit: 6,
      activePage: 1
    }
  };

  render() {
    const { start, limit, activePage } = this.state.pagination;
    return (
      <Modal size="lg" {...this.props}>
        <ModalHeader toggle={this.props.toggle}>
          <span className="text-lg">Pilih Absen</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <InputGroup>
                <CustomInput type="search" className="form-control" name="user" id="user" placeholder="Cari absensi berdasarkan nama user" />
                <InputGroupAddon addonType="append">
                  <Button color="primary">Cari</Button>
                </InputGroupAddon>
              </InputGroup>
              <Button className="mt-3" size="sm" color="success">
                <span className="fas fa-undo mr-2"></span>
                Muat Ulang Data
              </Button>
              <hr className="my-3" />
            </Col>
          </Row>
          <Row>
            {[...Array(12).fill(null)].slice(start, start + limit).map((a, i) => (
              <Col className="mb-4" lg="6">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" width="100" height="80" className="mr-4 rounded" alt="User Absen" />
                    <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                      <CardTitle className="m-0">
                        <p className="m-0 small">Eddy Gunawan</p>
                        <p className="m-0 small text-muted">Selasa, 12 Januari 2020</p>
                      </CardTitle>
                      <Button color="success" size="sm">Pilih</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter className="mt--4">
          <Pagination
            totalItemsCount={12}
            onChange={activePage => {
              const { limit } = this.state.pagination;
              this.setState({ 
                pagination: {
                  ...this.state.pagination,
                  start: (limit * activePage) - limit,
                  activePage 
                }
              });
            }}
            activePage={activePage}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
          />
        </ModalFooter>
      </Modal>
    );
  }
}

class AbsenByAdmin extends React.Component {
  render() {
    return (
      <Container className="mt--8">
        <Row>
          <Col className="col-12">
            <Card className="p-3 mb-3" body>
              <Row>
                <Col className="col-12 d-flex align-items-center justify-content-between">
                  <h2 className="m-0">Absen Oleh Admin</h2>
                  <Button color="primary" onClick={() => this.props.history.goBack()}>
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col className="mb-3 mb-lg-0" lg="6">
            <Card>
              <CardHeader>
                <h3 className="m-0">Absen Masuk</h3>
              </CardHeader>
              <CardBody>
                <AbsenMasuk />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <h3 className="m-0">Absen Keluar</h3>
              </CardHeader>
              <CardBody>
                <AbsenKeluar />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(FadeIn(AbsenByAdmin, Header));