import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPegawai } from './../../store/actions/pegawaiActions';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup, CustomInput, Label } from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import user from 'user.js';
import Swal from 'sweetalert2';

class PegawaiForm extends Component {
    state = {
        isLoading: false
    }
    toggleModal = () => {
        Swal.fire({
            text: 'Batalkan tambah pegawai?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Batal'
        })
        .then(({ value }) => value && this.props.toggle());
    }
    render() {
        const AddPegawaiSchema = Yup.object().shape({
            name: Yup.string()
                .required('Masukan nama pegawai'),
            username: Yup.string()
                .required('Masukan username pegawai'),
            alamat: Yup.string()
                .required('Masukan alamat pegawai'),
            nomor_handphone: Yup.string()
                .required('Masukan nomor telpon pegawai')
                .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Nomor telepon tidak valid'),
            email: Yup.string()
                .email('Email tidak valid')
                .required('Masuk email pegawai'),
        })
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            username: '',
                            jobdesc_id: this.props.jobs.length && this.props.jobs[0].id,
                            admin_id: user('id'),
                            role_id: 2,
                            alamat: '',
                            nomor_handphone: '',
                            password: ''
                        }}
                        validationSchema={AddPegawaiSchema}
                        onSubmit={data => {
                            this.setState({ isLoading: true });
                            data.jobdesc_id = Number(data.jobdesc_id);
                            data.role = Number(data.role);
                            this.props.addPegawai(data, () => {
                                this.props.getDataPegawai();
                                this.props.toggle();
                                this.setState({ isLoading: false });
                            }, () => this.setState({ isLoading: false }));
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <ModalHeader toggle={this.toggleModal}>
                                    <h2>Form Pegawai</h2>
                                </ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-name">
                                                    Nama
                                                </label>
                                                <Input invalid={errors.name && touched.name ? true : false} onChange={handleChange} value={values.name} name="name" className="form-control-alternative" id="input-name" type="text" placeholder="Nama" />
                                                {errors.name && touched.name ? (
                                                    <FormFeedback>{errors.name}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Username
                                                </label>
                                                <Input invalid={errors.username && touched.username ? true : false} onChange={handleChange} value={values.username} name="username" type="username" className="form-control-alternative" id="input-username" placeholder="Username" />
                                                {errors.username && touched.username ? (
                                                    <FormFeedback className="d-block">{errors.username}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Email
                                                </label>
                                                <Input invalid={errors.email && touched.email ? true : false} onChange={handleChange} value={values.email} name="email" type="email" className="form-control-alternative" id="input-email" placeholder="Email" />
                                                {errors.email && touched.email ? (
                                                    <FormFeedback className="d-block">{errors.email}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label for="jobdesc_id">Job</Label>
                                                <CustomInput type="select" className="form-control-alternative" id="jobdesc_id" name="jobdesc_id" onChange={handleChange}>
                                                    {this.props.jobs && this.props.jobs.map((job, i) => (
                                                        <option key={i} value={String(job.id)}>{job.name}</option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label for="role_id">Role</Label>
                                                <CustomInput type="select" className="form-control-alternative" id="role_id" name="role_id" onChange={handleChange}>
                                                    {this.props.roles && this.props.roles.map((role, i) => (
                                                        <option key={i} value={role.id}>{role.name}</option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-password">
                                                    Password
                                                </label>
                                                <Input onChange={handleChange} value={values.password} name="password" type="password" className="form-control-alternative" id="input-password" placeholder="Password" />
                                                {errors.password && touched.password ? (
                                                    <FormFeedback>{errors.password}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    No. Telpon
                                                </label>
                                                <Input invalid={errors.nomor_handphone && touched.nomor_handphone ? true : false} onChange={handleChange} value={values.nomor_handphone} name="nomor_handphone" type="text" className="form-control-alternative" id="input-nomor_handphone" placeholder="No. Telpon" />
                                                {errors.nomor_handphone && touched.nomor_handphone ? (
                                                    <FormFeedback className="d-block">{errors.nomor_handphone}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">
                                                    Alamat
                                                </label>
                                                <Input invalid={errors.alamat && touched.alamat ? true : false} onChange={handleChange} value={values.alamat} name="alamat" type="textarea" className="form-control-alternative" id="input-alamat" placeholder="Alamat" />
                                                {errors.alamat && touched.alamat ? (
                                                    <FormFeedback className="d-block">{errors.alamat}</FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                                    <LoadingButton type="submit" color="primary" condition={this.state.isLoading}>Tambah</LoadingButton>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        jobs: state.filter.jobs,
        roles: state.filter.roles.filter(role => role.id !== 1)
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPegawai: (pegawai, success, error) => {
            dispatch(addPegawai(pegawai, success, error))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PegawaiForm);