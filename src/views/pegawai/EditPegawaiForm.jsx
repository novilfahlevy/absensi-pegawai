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
              .required('Nama tidak boleh kosong.'),
            email: Yup.string()
              .email('Email tidak valid.')
              .required('Email harus diisi.'),
            password: Yup.string()
              .min(8, 'Password minimal harus berisi 8 karakter.')
              .required('Password tidak boleh kosong.'),
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
                                    password: ''
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
                                                <label className="form-control-label" htmlFor="input-password">
                                                    Password
                                                </label>
                                                <Input onChange={handleChange} value={values.password} name="password" type="password" className="form-control-alternative" id="input-password" placeholder="Password" />
                                                {errors.password && touched.password ? (
                                                    <FormFeedback className="d-block">{errors.password}</FormFeedback>
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