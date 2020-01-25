import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { editPegawai } from './../../store/actions/pegawaiActions';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import Loading from 'components/ui/Loading.jsx';
import api from 'store/api.js';

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
                                    alamat: this.state.pegawai.alamat,
                                    nomor_handphone: this.state.pegawai.nomor_handphone
                                }}
                                validationSchema={EditPegawaiSchema}
                                onSubmit={data => {
                                    // this.setState({ isLoading: true });
                                    // this.props.editPegawai(data, () => {
                                    //     this.props.getDataPegawai();
                                    //     this.props.toggle();
                                    //     this.setState({ isLoading: false })
                                    // }, () => this.setState({ isLoading: false }));
                                }}
                            >
                                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-username">
                                                    Nama
                                                </label>
                                                <Input invalid={errors.name && touched.name ? true : false} onChange={handleChange} value={values.name} name="name" className="form-control-alternative" id="input-username" type="text" placeholder="Nama" />
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
const mapDispatchToProps = (dispatch) => {
    return {
      editPegawai: (pegawai, success = () => {}, error = () => {}) => {
        dispatch(editPegawai(pegawai, success, error));
      }
    }
}
export default connect(null, mapDispatchToProps)(EditPegawaiForm);