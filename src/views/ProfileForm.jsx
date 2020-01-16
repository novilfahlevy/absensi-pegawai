import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
class ProfileForm extends Component {
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <Form>
                        <ModalHeader>
                            <h2>Ubah Data Profile</h2>
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="input-username">
                                    Username
                            </label>
                                <Input className="form-control-alternative" id="input-username" placeholder="Username" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="input-email">
                                    Email
                            </label>
                                <Input type="email" className="form-control-alternative" id="input-email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <label className="form-control-label" htmlFor="input-email">
                                    Address
                            </label>
                                <Input type="textarea" rows={5} id="input-email" placeholder="Write your address" />
                            </FormGroup>
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
export default ProfileForm;