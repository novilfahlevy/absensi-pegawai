import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editPegawai } from './../../store/actions/pegawaiActions';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import Loading from 'components/ui/Loading.jsx';
import api from 'store/api.js';
import Swal from 'sweetalert2';

class EditPegawaiForm extends Component {
    state = {
      modal: false,
      isLoading: false,
      pegawai: null
    }
    toggle = () => this.setState({ modal: !this.state.modal });
    componentDidMount() {
      api().get(`user/${this.props.pegawaiId}`)
      .then(res => {
        this.setState({ pegawai: res.data.user })
      });
    }
    render() {
        const EditPegawaiSchema = Yup.object().shape({
            name: Yup.string()
                .required('Masukan nama pegawai'),
            username: Yup.string()
                .required('Masukan username pegawai'),
            alamat: Yup.string()
                .required('Masukan alamat pegawai'),
            nomor_handphone: Yup.string()
                .required('Masukan nomor telpon pegawai'),
            email: Yup.string()
                .email('Email tidak valid')
                .required('Masuk email pegawai'),
        })

        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h2>Edit Pegawai</h2>
                    </ModalHeader>
                    <ModalBody>
                        {this.state.pegawai ? (
                                <Formik
                                initialValues={{
                                    name: this.state.pegawai.name,
                                    email: this.state.pegawai.email,
                                    username: this.state.pegawai.username,
                                    jobdesc_id: this.state.pegawai.jobdesc_id,
                                    role_id: this.state.pegawai.roles[0].id,
                                    alamat: this.state.pegawai.alamat,
                                    nomor_handphone: this.state.pegawai.nomor_handphone
                                }}
                                validationSchema={EditPegawaiSchema}
                                onSubmit={data => {
                                    this.setState({ isLoading: true });
                                    data.jobdesc_id = Number(data.jobdesc_id);
                                    data.role_id = Number(data.role_id);
                                    api().post(`user/edit/${this.props.pegawaiId}`, data)
                                    .then(response => {
                                        Swal.fire({
                                            icon: 'success',
                                            text: 'Pegawai berhasil diubah!'
                                        });
                                        this.props.getDataPegawai();
                                        this.props.toggle();
                                        this.setState({ isLoading: false })
                                    })
                                }}
                            >
                                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-username">
                                                    Nama
                                                </label>
                                                <Input invalid={errors.name && touched.name ? true : false} onChange={handleChange} value={values.name} name="name" className="form-control-alternative" id="input-name" type="text" placeholder="Nama" />
                                                {errors.name && touched.name ? (
                                                    <FormFeedback>{errors.name}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Email
                                                </label>
                                                <Input nvalid={errors.email && touched.email ? true : false} onChange={handleChange} value={values.email} name="email" type="email" className="form-control-alternative" id="input-email" placeholder="Email" />
                                                {errors.email && touched.email ? (
                                                    <FormFeedback className="d-block">{errors.email}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="jobdesc_id">Job</Label>
                                                <CustomInput type="select" className="form-control-alternative" id="jobdesc_id" name="jobdesc_id" onChange={handleChange} value={String(values.jobdesc_id)}>
                                                    {this.props.jobs && this.props.jobs.map((job, i) => (
                                                        <option key={i} value={String(job.id)} default={job.id === values.jobdesc_id}>{job.name}</option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="role_id">Role</Label>
                                                <CustomInput type="select" className="form-control-alternative" id="role_id" name="role_id" onChange={handleChange} value={String(values.role_id)}>
                                                    {this.props.roles && this.props.roles.map((role, i) => (
                                                        <option key={i} value={role.id} default={role.id === values.role_id}>{role.name}</option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Username
                                                </label>
                                                <Input invalid={errors.username && touched.username ? true : false} onChange={handleChange} value={values.username} name="username" type="username" className="form-control-alternative" id="input-username" placeholder="Username" />
                                                {errors.username && touched.username ? (
                                                    <FormFeedback className="d-block">{errors.username}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    No. Telpon
                                                </label>
                                                <Input invalid={errors.nomor_handphone && touched.nomor_handphone ? true : false} onChange={handleChange} value={values.nomor_handphone} name="nomor_handphone" type="text" className="form-control-alternative" id="input-nomor_handphone" placeholder="No. Telpon" />
                                                {errors.nomor_handphone && touched.nomor_handphone ? (
                                                    <FormFeedback className="d-block">{errors.nomor_handphone}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Alamat
                                                </label>
                                                <Input invalid={errors.alamat && touched.alamat ? true : false} onChange={handleChange} value={values.alamat} name="alamat" type="textarea" className="form-control-alternative" id="input-alamat" placeholder="Alamat" />
                                                {errors.alamat && touched.alamat ? (
                                                    <FormFeedback className="d-block">{errors.alamat}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                                            <LoadingButton type="submit" color="primary" condition={this.state.isLoading}>Edit</LoadingButton>
                                        </ModalFooter>
                                    </Form>
                                )}
                            </Formik>
                        ) : <Row><Col className="d-flex justify-content-center align-items-center"><Loading /></Col></Row>}
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      jobs: state.filter.jobs,
      roles: state.filter.roles.filter(role => role.id !== 1)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      editPegawai: (pegawai, success = () => {}, error = () => {}) => {
        dispatch(editPegawai(pegawai, success, error));
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPegawaiForm);