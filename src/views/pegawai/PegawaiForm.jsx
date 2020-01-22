import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPegawai } from './../../store/actions/pegawaiActions';
import { Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';

class PegawaiForm extends Component {
    state = {
        isLoading: false
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
                .required('Masukan nomor telpon pegawai'),
            email: Yup.string()
                .email('Email tidak valid')
                .required('Masuk email pegawai'),
        })
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            username: '',
                            alamat: '',
                            nomor_handphone: '',
                            password: ''
                        }}
                        validationSchema={AddPegawaiSchema}
                        onSubmit={data => {
                            this.setState({ isLoading: true });
                            this.props.addPegawai(data, () => {
                                this.props.getDataPegawai();
                                this.props.toggle();
                                this.setState({ isLoading: false })
                            }, () => this.setState({ isLoading: false }));
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <ModalHeader toggle={this.props.toggle}>
                                    <h2>Form Pegawai</h2>
                                </ModalHeader>
                                <ModalBody>
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
                                            Username
                                        </label>
                                        <Input invalid={errors.username && touched.username ? true : false} onChange={handleChange} value={values.username} name="username" type="username" className="form-control-alternative" id="input-username" placeholder="Username" />
                                        {errors.username && touched.username ? (
                                            <FormFeedback className="d-block">{errors.username}</FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="form-control-label" htmlFor="input-email">
                                            Email
                                        </label>
                                        <Input invalid={errors.email && touched.email ? true : false} onChange={handleChange} value={values.email} name="email" type="email" className="form-control-alternative" id="input-email" placeholder="Email" />
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
                                            <FormFeedback>{errors.password}</FormFeedback>
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

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
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
const mapDispatchToProps = (dispatch) => {
    return {
        addPegawai: (pegawai, success, error) => {
            dispatch(addPegawai(pegawai, success, error))
        }
    }
}
export default connect(null, mapDispatchToProps)(PegawaiForm);