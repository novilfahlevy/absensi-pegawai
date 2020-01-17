import React, { Component } from 'react';
import API from './../store/api.js';
import { connect } from 'react-redux';
import { changeProfile } from './../store/actions/profileActions.js';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
class ProfileForm extends Component {
    state = {
        file: 'http://127.0.0.1:8000/storage/profiles/default.jpg',
        real_file: null
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.changeProfile({ user_id: this.props.user_id, profile: this.state.real_file });
        this.props.toggle();
    }
    handleChange = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            real_file: e.target.files[0]
        })
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
                                    <h2 className="font-weight-light">Your New Profile Will Be Shown Below</h2>
                                    <img
                                        alt="..."
                                        height="200"
                                        width="200"
                                        style={{ border: "6px solid #eee", backgroundSize: "cover", objectFit: "cover" }}
                                        className="rounded-circle"
                                        src={this.state.file}
                                        id="change-profile-preview"
                                    />
                                    <input onChange={this.handleChange} type="file" name="new-profile" id="change-profile-source"></input>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                            <Button type="submit" color="primary">Ubah</Button>{' '}
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
        changeProfile: data => dispatch(changeProfile(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);