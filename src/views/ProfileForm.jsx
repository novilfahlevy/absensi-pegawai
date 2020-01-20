import React, { Component } from 'react';
import LoadingButton from 'components/ui/LoadingButton.jsx'
import { connect } from 'react-redux';
import { changeProfile } from './../store/actions/profileActions.js';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, CustomInput, FormFeedback } from 'reactstrap';
class ProfileForm extends Component {
    state = {
        file: 'http://127.0.0.1:8000/storage/profiles/default.jpg',
        real_file: null,
        file_name: '',
        error: null,
        isLoading: false
    }
    handleSubmit = e => {
        e.preventDefault();
        if ( this.state.real_file ) {
            this.setState({ isLoading: true });
            this.props.changeProfile({ user_id: this.props.user_id, profile: this.state.real_file }, () => {
                this.setState({ 
                    isLoading: false, 
                    file: 'http://127.0.0.1:8000/storage/profiles/default.jpg',
                    real_file: null,
                    file_name: ''
                }, this.props.toggle);
                this.props.getData();
            }, () => this.setState({ isLoading: false }));
        }
        else this.setState({ error: 'Masukan gambar yang ingin anda pakai.' });
    }
    handleChange = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            real_file: e.target.files[0]
        }, () => {
            this.setState({ file_name: this.state.real_file.name });

            if ( this.state.real_file.size > 2000000 ) {
                this.setState({ error: 'Ukuran gambar terlalu besar, maksimal 2MB.' });
                return;
            }

            if ( !['jpg', 'png', 'jpeg'].includes(this.state.real_file.type.replace('image/', '')) ) {
                this.setState({ error: 'Jenis gambar hanya boleh JPEG, JPG, dan PNG.' });
                return;
            }

            this.setState({ error: null });
        });
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.props.toggle}>
                            <h2>Ubah Gambar Profile</h2>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col className="col-12 text-center">
                                    <img
                                        alt="..."
                                        height="200"
                                        width="200"
                                        style={{ border: "6px solid #eee", backgroundSize: "cover", objectFit: "cover" }}
                                        className="rounded-circle"
                                        src={this.state.file}
                                        id="change-profile-preview"
                                    />
                                    <FormGroup>
                                        <CustomInput onChange={this.handleChange} type="file" name="new-profile" id="change-profile-source" className="mt-4" label="Pilih gambar profile" disabled={this.state.isLoading} />
                                        {this.state.file_name && <p className="mt-3">
                                            {this.state.file_name}
                                        </p>}
                                        {this.state.error && <FormFeedback className="d-block mt-3">
                                            {this.state.error}
                                        </FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                            <LoadingButton type="submit" color="primary" condition={this.state.isLoading} disabled={Boolean(this.state.error)}>Ubah</LoadingButton>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user_id: state.auth.user.id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: (data, success, error) => {
            dispatch(changeProfile(data, success, error));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
