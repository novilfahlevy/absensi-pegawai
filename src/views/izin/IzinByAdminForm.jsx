import React from 'react';
import api from 'store/api.js';
import Swal from 'sweetalert2';
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
  CardImg,
  CardText,
  Alert,
  Form,
  FormFeedback
} from 'reactstrap';

import LoadingButton from 'components/ui/LoadingButton.jsx';
import IzinByAdminModal from 'views/izin/IzinByAdminModal.jsx';

class IzinByAdminForm extends React.Component {
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

  setSelectedUser = ({ id, name, profile, izin_terakhir }) => {
    this.setState({
      selectedUser: { id, name, profile, izin_terakhir }
    });
  }

  izin = (data, callback) => {
    this.setState({ izinLoading: true });
    this.setState({ isAlert: false });
    api().post('user/izin', {
      ...data,
      user_id: this.state.selectedUser.id
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
          alert: { type: 'success', message: 'Izin berhasil' }
        }, () => {
          this.toggleAlert();
        });
        callback();
      });
  }

  render() {
    const izinPerhariSchema = Yup.object().shape({
      tanggal_mulai: Yup.string()
        .required('Masukan tanggal mulai izin'),
      tanggal_selesai: Yup.string()
        .required('Masukan tanggal selesai izin'),
      alasan: Yup.string()
        .required('Masukan alasan izin')
    });

    const { name = null, profile = null, izin_terakhir = null } = this.state.selectedUser; 

    return (
      <>
        <Formik
          initialValues={{
            tanggal_mulai: '',
            tanggal_selesai: '',
            alasan: 'sakit',
            keterangan: ''
          }}
          validationSchema={izinPerhariSchema}
          onSubmit={(data, { resetForm }) => {
            if ( !!Object.keys(this.state.selectedUser).length ) {
              this.izin(data, resetForm);
            }
            else {
              Swal.fire(
                'Pilih User',
                'Pilih User Yang Ingin Izin',
                'warning'
              );
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg="4">
                  <Card>
                    <CardImg top width="100%" src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${profile || 'default.jpg'}`} height="250" alt="User" />
                    <CardBody>
                      <CardTitle className="text-lg">{name || '-'}</CardTitle>
                      <CardText className="mt-2">
                        <strong>Terakhir izin :</strong>
                        <p className="m-0 text-dark">{izin_terakhir || '-'}</p>
                      </CardText>
                      <Button color="primary" className="mt-3 w-100" onClick={this.toggleSelectUserModal}>Pilih User</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Row>
                    <Col className="col-12">
                      <Alert className="mb-3" isOpen={this.state.isAlert} toggle={this.toggleAlert} color={this.state.alert.type}>
                        <p className="m-0">
                          {this.state.alert.message}
                        </p>
                      </Alert>
                    </Col>
                    <Col className="col-12">
                      <FormGroup>
                        <Label htmlFor="tanggal_mulai">Tanggal Mulai</Label>
                        <CustomInput type="date" className="form-control" name="tanggal_mulai" id="tanggal_mulai" onChange={handleChange} value={values.tanggal_mulai} />
                        {errors.tanggal_mulai && touched.tanggal_mulai ? (
                          <FormFeedback className="d-block">{errors.tanggal_mulai}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="col-12">
                      <FormGroup>
                        <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
                        <CustomInput type="date" className="form-control" name="tanggal_selesai" id="tanggal_selesai" onChange={handleChange} value={values.tanggal_selesai} />
                        {errors.tanggal_selesai && touched.tanggal_selesai ? (
                          <FormFeedback className="d-block">{errors.tanggal_selesai}</FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="col-12">
                      <FormGroup>
                        <Label htmlFor="alasan">Alasan</Label>
                        <Input type="select" className="form-control" name="alasan" id="alasan" onChange={e => {
                          handleChange(e);
                          this.setState({ alasanLain: !e.target.value });
                        }}>
                          <option value="Kepentingan Diluar" defaultValue>Kepentingan Diluar</option>
                          <option value="Sakit">Sakit</option>
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
                      <LoadingButton type="submit" condition={this.state.izinLoading} color="primary">Absen</LoadingButton>
                    </Col>
                  </Row>
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

export default FadeIn(IzinByAdminForm);