import React from 'react';
import api from 'store/api.js';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { Formik } from 'formik';
import * as Yup from 'yup';

import 'moment/locale/id';

import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Form,
  FormFeedback
} from 'reactstrap';

import IzinByAdminModal from 'views/izin/IzinByAdminModal.jsx';

class IzinPerhariByAdmin extends React.Component {
  state = {
    selectedUser: {},
    alert: {},
    isAlert: false,
    selectUserModal: false,
    izinLoading : false,
    alasanLain: false
  };

  toggleAlert = () => {
    this.setState({ isAlert: !this.state.isAlert }, () => {
      if ( !this.state.isAlert ) {
        this.setState({ alert: {} });
      }
    });
  }

  toggleSelectUserModal = () => {
    this.setState({ selectUserModal: !this.state.selectUserModal });
  }

  setSelectedUser = ({ id, name, profile }) => {
    this.setState({
      selectedUser: { id, name, profile }
    });
  }

  absen = (data, callback) => {
    this.setState({ izinLoading: true });
    this.setState({ isAlert: false });
    api().post('absen-masuk/by-admin', {
      ...data,
      userId: this.state.selectedUser.id
    })
      .then(response => {
        if ( response.data.status === 400 ) {
          this.setState({ izinLoading: false });
          this.setState({
            alert: { type: 'danger', message: response.data.message }
          }, () => {
            this.toggleAlert();
          });
          return;
        }
        this.setState({ izinLoading: false });
        this.setState({ selectedUser: {} });
        this.setState({
          alert: { type: 'success', message: 'Absen berhasil' }
        }, () => {
          this.toggleAlert();
        });
        callback();
      });
  }

  render() {
    const izinPerhariSchema = Yup.object().shape({
      tanggalMulai: Yup.string()
        .required('Masukan tanggal mulai izin'),
      tanggalSelesai: Yup.string()
        .required('Masukan tanggal selesai izin'),
      alasan: Yup.string()
        .required('Masukan alasan izin')
    });

    const { name = null, profile = null } = this.state.selectedUser; 

    return (
      <>
        <Formik
          initialValues={{
            tanggalMulai: '',
            tanggalSelesai: '',
            alasan: 'sakit',
            keterangan: ''
          }}
          validationSchema={izinPerhariSchema}
          onSubmit={(data, { resetForm }) => {
            console.log(data);
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
                  <Row>
                    <Col className="col-12">
                      <Alert className="mb-3" isOpen={this.state.isAlert} toggle={this.toggleAlert} color={this.state.alert.type}>
                        <p className="m-0">
                          {this.state.alert.message}
                        </p>
                      </Alert>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="tanggalMulai">Tanggal Mulai</Label>
                        <CustomInput type="date" className="form-control" name="tanggalMulai" id="tanggalMulai" onChange={handleChange} value={values.tanggalMulai} />
                        {errors.tanggalMulai && touched.tanggalMulai ? (
                          <FormFeedback className="d-block">{errors.tanggalMulai}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
                        <CustomInput type="date" className="form-control" name="tanggalSelesai" id="tanggalSelesai" onChange={handleChange} value={values.tanggalSelesai} />
                        {errors.tanggalSelesai && touched.tanggalSelesai ? (
                          <FormFeedback className="d-block">{errors.tanggalSelesai}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-12">
                  <FormGroup>
                    <Label htmlFor="alasan">Alasan</Label>
                    <Input type="select" className="form-control" name="alasan" id="alasan" onChange={e => {
                      handleChange(e);
                      this.setState({ alasanLain: !e.target.value });
                    }}>
                      <option value="Sakit" defaultValue>Sakit</option>
                      <option value="Cuti">Cuti</option>
                      <option value="">Lainnya...</option>
                    </Input>
                  </FormGroup>
                  {this.state.alasanLain && (
                    <FormGroup>
                      <Label htmlFor="alasan">Alasan Lain</Label>
                      <Input type="text" className="form-control" name="alasan" id="alasan" onChange={handleChange} value={values.alasan} />
                      {(errors.alasan && touched.alasan) ? (
                        <FormFeedback className="d-block">{errors.alasan}</FormFeedback>
                      ) : null}
                    </FormGroup>
                  )}
                </Col>
                <Col className="col-12">
                  <FormGroup>
                    <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
                    <Input type="textarea" className="form-control" name="keterangan" id="keterangan" onChange={handleChange} value={values.keterangan} />
                  </FormGroup>
                  <Button type="submit" color="primary">Absen</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <IzinByAdminModal 
          isOpen={this.state.selectUserModal} 
          toggle={this.toggleSelectUserModal} 
          setSelectedUser={this.setSelectedUser} 
        />
      </>
    );
  }
}

export default FadeIn(IzinPerhariByAdmin);