import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addPegawai } from './../../store/actions/pegawaiActions';
import { Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';

class PegawaiForm extends Component {
    state = {
        modal: false,
        isLoading: false
    }
    toggle = () => this.setState({ modal: !this.state.modal });
    render() {
        const AddPegawaiSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too short!')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Required'),
        })
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
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
                                        <Input invalid={errors.name && touched.name ? true : false} onChange={handleChange} value={values.name} name="name" className="form-control-alternative" id="input-username" type="text" />
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
                                            <FormFeedback>{errors.password}</FormFeedback>
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
        addPegawai: (pegawai, successcallback, errorCallback) => {
            dispatch(addPegawai(pegawai, successcallback, errorCallback))
        }
    }
}
export default connect(null, mapDispatchToProps)(PegawaiForm);