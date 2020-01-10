import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
class PegawaiForm extends Component {
    state = {
        modal: false,
        unmountOnClose: false,
    }
    toggle = () => this.setState({ modal: !this.state.modal });
    changeUnmountOnClose = e => {
        let value = e.target.value;
        this.setState({ unmountOnClose: JSON.parse(value) });
    }
    render() {
        const { unmountOnClose } = this.state;
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} unmountOnClose={unmountOnClose}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h2>Tambah Pegawai</h2>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                            <label className="form-control-label" htmlFor="input-username">
                              Username
                            </label>
                            <Input  className="form-control-alternative" id="input-username" placeholder="Username" type="text"/>
                          </FormGroup>
                        </Form>  
                        <Form>
                            <FormGroup>
                            <label className="form-control-label" htmlFor="input-email">
                              Email
                            </label>
                            <Input type="email"  className="form-control-alternative" id="input-email" placeholder="Email"/>
                          </FormGroup>
                        </Form>  
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        <Button color="primary">Tambah</Button>{' '}
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default PegawaiForm;