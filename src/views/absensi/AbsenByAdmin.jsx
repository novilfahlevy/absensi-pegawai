import React from 'react';
import api from 'store/api.js';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import moment from 'moment';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import Pagination from 'react-js-pagination';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import 'moment/locale/id';

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
    selectedUser: {},
    alert: {},
    selectUserModal: false,
    absenLoading : false
  };

  toggleSelectUserModal = () => {
    this.setState({ selectUserModal: !this.state.selectUserModal });
  }

  setSelectedUser = ({ id, name, profile }) => {
    this.setState({
      selectedUser: { id, name, profile }
    });
  }

  absen = (data, callback) => {
    this.setState({ absenLoading: true });
    api().post('absen-masuk/by-admin', {
      ...data,
      userId: this.state.selectedUser.id
    })
      .then(response => {
        if ( response.data.status === 400 ) {
          this.setState({ absenLoading: false });
          this.setState({
            alert: { type: 'danger', message: response.data.message }
          });
          return;
        }
        this.setState({ absenLoading: false });
        this.setState({ selectedUser: {} });
        this.setState({
          alert: { type: 'success', message: 'Absen berhasil' }
        });
        callback();
      });
  }

  render() {
    const absenMasukSchema = Yup.object().shape({
      tanggal: Yup.string()
        .required('Masukan tanggal absensi'),
      jamAbsen: Yup.string()
        .required('Masukan jam absensi')
    });

    const { name = null, profile = null } = this.state.selectedUser; 

    return (
      <>
        <Formik
          initialValues={{
            tanggal: '',
            jamAbsen: ''
          }}
          validationSchema={absenMasukSchema}
          onSubmit={(data, { resetForm }) => {
            if ( !!Object.keys(this.state.selectedUser).length ) {
              data.tanggal = moment(data.tanggal).format('YYYY-MM-DD');
              this.absen(data, () => resetForm());
            } else {
              Swal.fire(
                '',
                'Pilih user yang akan diabsen',
                'warning'
              )
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody className="p-0 d-flex align-items-center">
                      <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${profile || 'default.jpg'}`} width="80" height="80" className="mr-4 rounded" alt="User Absen" />
                      <CardTitle className="m-0">
                        <p className="m-0">{name || '-'}</p>
                      </CardTitle>
                    </CardBody>
                  </Card>
                  <Button color="primary" className="mt-3 w-100" onClick={this.toggleSelectUserModal}>Pilih User</Button>
                  <hr className="mb-3 mt-4" />
                </Col>
                <Col className="col-12">
                  {!!Object.keys(this.state.alert).length && (
                    <UncontrolledAlert className="mb-3" color={this.state.alert.type}>
                      <p className="m-0">
                        {this.state.alert.message}
                      </p>
                    </UncontrolledAlert>
                  )}
                  <FormGroup>
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <CustomInput type="date" className="form-control" name="tanggal" id="tanggal" onChange={handleChange} value={values.tanggal} />
                    {errors.tanggal && touched.tanggal ? (
                      <FormFeedback className="d-block">{errors.tanggal}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col className="col-12">
                  <FormGroup>
                    <Label htmlFor="jamAbsen">Jam Absen</Label>
                    <CustomInput type="time" className="form-control" name="jamAbsen" id="jamAbsen" onChange={handleChange} value={values.jamAbsen} />
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
                  <LoadingButton type="submit" condition={this.state.absenLoading} color="primary">Absen</LoadingButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <ModalUserAbsenMasuk 
          isOpen={this.state.selectUserModal} 
          toggle={this.toggleSelectUserModal} 
          setSelectedUser={this.setSelectedUser} 
        />
      </>
    );
  }
}

class AbsenKeluar extends React.Component {
  state = {
    selectedUser: {},
    alert: {},
    selectAbsenModal: false,
    absenLoading: false
  }

  toggleSelectAbsenModal = () => {
    this.setState({ selectAbsenModal: !this.state.selectAbsenModal });
  }

  setSelectedUser = ({ id, name, profile, tanggal }) => {
    this.setState({
      selectedUser: { id, name, profile, tanggal }
    });
  }

  absen = (data, callback) => {
    this.setState({ absenLoading: true });
    api().post('absen-keluar/by-admin', {
      ...data,
      userId: this.state.selectedUser.id
    })
      .then(response => {
        if ( response.data.status === 400 ) {
          this.setState({ absenLoading: false });
          this.setState({
            alert: { type: 'danger', message: response.data.message }
          });
          return;
        }
        this.setState({ absenLoading: false });
        this.setState({ selectedUser: {} });
        this.setState({
          alert: { type: 'success', message: 'Absen berhasil' }
        });
        callback();
      });
  }

  render() {
    const absenKeluarSchema = Yup.object().shape({
      jamAbsen: Yup.string()
        .required('Masukan jam absensi')
    })

    const { name = null, profile = null, tanggal = null } = this.state.selectedUser;

    return (
      <>
        <Formik
          initialValues={{
            jamAbsen: ''
          }}
          validationSchema={absenKeluarSchema}
          onSubmit={(data, { resetForm }) => {
            if ( !!Object.keys(this.state.selectedUser).length ) {
              data.absenId = this.state.selectedUser.id;
              this.absen(data, () => resetForm());
            } else {
              Swal.fire(
                '',
                'Pilih user yang akan diabsen',
                'warning'
              )
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody className="p-0 d-flex align-items-center">
                      <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${profile || 'default.jpg'}`} width="80" height="80" className="mr-4 rounded" alt="User Absen" />
                      <CardTitle className="m-0">
                        {(name && tanggal) ? (
                          <>
                            <p className="m-0 text-lg">{name}</p>
                            <p className="m-0 small text-muted">{tanggal}</p>
                          </>
                        ) : (
                          <p className="m-0">-</p>
                        )}
                      </CardTitle>
                    </CardBody>
                  </Card>
                  <Button color="primary" className="mt-3 w-100" onClick={this.toggleSelectAbsenModal}>Pilih Absen</Button>
                  <hr className="mb-3 mt-4" />
                </Col>
                <Col className="col-12">
                  {!!Object.keys(this.state.alert).length && (
                    <UncontrolledAlert className="mb-3" color={this.state.alert.type}>
                      <p className="m-0">
                        {this.state.alert.message}
                      </p>
                    </UncontrolledAlert>
                  )}
                  <FormGroup>
                    <Label htmlFor="jamAbsen">Jam Absen</Label>
                    <CustomInput type="time" className="form-control" name="jamAbsen" id="jamAbsen" onChange={handleChange} value={values.jamAbsen} />
                    {errors.jamAbsen && touched.jamAbsen ? (
                      <FormFeedback className="d-block">{errors.jamAbsen}</FormFeedback>
                    ) : null}
                  </FormGroup>
                  <LoadingButton type="submit" condition={this.state.absenLoading} color="primary">Absen</LoadingButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <ModalUserAbsenKeluar 
          isOpen={this.state.selectAbsenModal} 
          toggle={this.toggleSelectAbsenModal} 
          setSelectedUser={this.setSelectedUser}
        />          
      </>
    );
  }
}

class ModalUserAbsenMasuk extends React.Component {
  state = {
    users: [],
    searchUserKeyword: '',
    pagination: {
      start: 0,
      limit: 6,
      activePage: 1
    },
    loading: {
      refreshData: false,
      searchUser: false
    }
  };

  componentWillReceiveProps() {
    if ( !this.props.isOpen ) {
      this.getUsersData();
    }
  }

  setLoading(loading, isLoading) {
    this.setState({ 
      loading: {
        ...this.state.loading,
        [loading]: isLoading
      } 
    });
  };

  getUsersData(callback) {
    api().get('users/absen-masuk/by-admin')
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, callback);
        });
      });
  }

  resetPagination() {
    this.setState({
      pagination: {
        ...this.state.pagination,
        start: 0,
        activePage: 1
      }
    });
  }

  searchData = e => {
    e.preventDefault();
    this.setLoading('searchUser', true);
    api().get(`search/user/${this.state.searchUserKeyword}/absen-by-admin`)
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, () => {
            this.resetPagination();
            this.setLoading('searchUser', false);
          });
        });
      });
  }

  refreshData = e => {
    e.preventDefault();
    this.setState({ searchUserKeyword: '' });
    this.setLoading('refreshData', true);
    this.getUsersData(() => {
      this.resetPagination();
      this.setLoading('refreshData', false)
    });
  }

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
              <Form onSubmit={this.searchData}>
                <InputGroup>
                  <CustomInput type="search" className="form-control" name="user" id="user" placeholder="Cari nama user" value={this.state.searchUserKeyword} onChange={e => {
                    this.setState({ searchUserKeyword: e.target.value });
                  }} />
                  <InputGroupAddon addonType="append">
                    <LoadingButton type="submit" condition={this.state.loading.searchUser} color="primary" disabled={!this.state.searchUserKeyword}>Cari</LoadingButton>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <Form onSubmit={this.refreshData}>
                <LoadingButton type="submit" className="mt-3" condition={this.state.loading.refreshData} size="sm" color="success">
                  <span className="fas fa-undo mr-2"></span>
                  Muat Ulang Data
                </LoadingButton>
              </Form>
              <hr className="my-3" />
            </Col>
          </Row>
          <Row>
            {this.state.users.length ? this.state.users.slice(start, start + limit).map(user => (
              <Col key={user.id} className="mb-4" lg="6">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${user.profile || 'default.jpg'}`} width="100" height="70" className="mr-4 rounded" alt="User Absen" />
                    <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                      <CardTitle className="m-0">
                        <p className="m-0">{user.name}</p>
                      </CardTitle>
                      <Button color="success" size="sm" onClick={() => {
                        this.props.setSelectedUser({
                          id: user.id,
                          name: user.name,
                          profile: user.profile
                        });
                        this.props.toggle();
                      }}>Pilih</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )) : (
              <div className="w-100">
                <p className="text-lg text-center">Tidak ada data...</p>  
              </div>
            )}
          </Row>
        </ModalBody>
        <ModalFooter className="mt--4">
          <Pagination
            totalItemsCount={this.state.users.length}
            itemsCountPerPage={this.state.pagination.limit}
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
    users: [],
    searchUserKeyword: '',
    pagination: {
      start: 0,
      limit: 6,
      activePage: 1
    },
    loading: {
      refreshData: false,
      searchUser: false
    }
  };

  componentWillReceiveProps() {
    if ( !this.props.isOpen ) {
      this.getUsersData();
    }
  }

  setLoading = (loading, isLoading) => {
    this.setState({
      loading: {
        ...this.state.loading,
        [loading]: isLoading
      }
    });
  }

  getUsersData(callback) {
    api().get('users/absen-keluar/by-admin')
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, callback);
        }); 
      });
  }

  resetPagination() {
    this.setState({
      pagination: {
        ...this.state.pagination,
        start: 0,
        activePage: 1
      }
    });
  }

  searchData = e => {
    e.preventDefault();
    this.setLoading('searchUser', true);
    api().get(`search/absensi/${this.state.searchUserKeyword}/absen-by-admin`)
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, () => {
            this.resetPagination();
            this.setLoading('searchUser', false);
          });
        });
      });
  }

  refreshData = e => {
    e.preventDefault();
    this.setLoading('refreshData', true);
    this.setState({ searchUserKeyword: '' });
    this.getUsersData(() => {
      this.resetPagination();
      this.setLoading('refreshData', false);
    });
  }

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
              <Form onSubmit={this.searchData}>
                <InputGroup>
                  <CustomInput type="search" className="form-control" name="user" id="user" placeholder="Cari absensi berdasarkan nama user" value={this.state.searchUserKeyword}onChange={e => {
                    this.setState({ searchUserKeyword: e.target.value });
                  }} />
                  <InputGroupAddon addonType="append">
                    <LoadingButton type="submit" condition={this.state.loading.searchUser} disabled={!this.state.searchUserKeyword} value={this.state.searchUserKeyword} color="primary">Cari</LoadingButton>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <Form onSubmit={this.refreshData}>
                <LoadingButton type="submit" condition={this.state.loading.refreshData} className="mt-3" size="sm" color="success">
                  <span className="fas fa-undo mr-2"></span>
                  Muat Ulang Data
                </LoadingButton>
              </Form>
              <hr className="my-3" />
            </Col>
          </Row>
          <Row>
            {this.state.users.length ? this.state.users.slice(start, start + limit).map(user => (
              <Col key={user.id} className="mb-4" lg="6">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${user.profile}`} width="100" height="80" className="mr-4 rounded" alt="User Absen" />
                    <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                      <CardTitle className="m-0">
                        <p className="m-0">{user.name}</p>
                        <p className="m-0 small text-muted">{user.tanggal}</p>
                      </CardTitle>
                      <Button color="success" size="sm" onClick={() => {
                        this.props.setSelectedUser({
                          id: user.id,
                          name: user.name,
                          profile: user.profile,
                          tanggal: user.tanggal
                        });
                        this.props.toggle();
                      }}>Pilih</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )) : (
              <div className="w-100">
                <p className="text-lg text-center">Tidak ada data...</p>
              </div>
            )}
          </Row>
        </ModalBody>
        <ModalFooter className="mt--4">
          <Pagination
            totalItemsCount={this.state.users.length}
            itemsCountPerPage={this.state.pagination.limit}
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