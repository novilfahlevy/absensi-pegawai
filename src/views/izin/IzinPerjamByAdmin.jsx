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

class IzinPerjamByAdmin extends React.Component {
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
    const izinPerjamSchema = Yup.object().shape({
      tanggal: Yup.string()
        .required('Masukan tanggal izin'),
      jamMulai: Yup.string()
        .required('Masukan jam mulai izin'),
      jamSelesai: Yup.string()
        .required('Masukan jam selesai izin'),
      alasan: Yup.string()
        .required('Masukan alasan izin')
    });

    const { name = null, profile = null } = this.state.selectedUser; 

    return (
      <>
        <Formik
          initialValues={{
            tanggal: '',
            jamMulai: '',
            jamSelesai: '',
            alasan: 'sakit',
            keterangan: ''
          }}
          validationSchema={izinPerjamSchema}
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
                  <Alert className="mb-3" isOpen={this.state.isAlert} toggle={this.toggleAlert} color={this.state.alert.type}>
                    <p className="m-0">
                      {this.state.alert.message}
                    </p>
                  </Alert>
                  <FormGroup>
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <CustomInput type="date" className="form-control" name="tanggal" id="tanggal" onChange={handleChange} value={values.tanggal} />
                    {errors.tanggal && touched.tanggal ? (
                      <FormFeedback className="d-block">{errors.tanggal}</FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col className="col-12">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="jamMulai">Jam Mulai</Label>
                        <CustomInput type="time" className="form-control" name="jamMulai" id="jamMulai" onChange={handleChange} value={values.jamMulai} />
                        {errors.jamMulai && touched.jamMulai ? (
                          <FormFeedback className="d-block">{errors.jamMulai}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="jamSelesai">Jam Selesai</Label>
                        <CustomInput type="time" className="form-control" name="jamSelesai" id="jamSelesai" onChange={handleChange} value={values.jamSelesai} />
                        {errors.jamSelesai && touched.jamSelesai ? (
                          <FormFeedback className="d-block">{errors.jamSelesai}</FormFeedback>
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

export default FadeIn(IzinPerjamByAdmin);