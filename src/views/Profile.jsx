/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Container,
    Row,
    Col,
    Input,
    FormGroup,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import ProfileForm from "./ProfileForm.jsx";
import LoadingButton from "./../components/ui/LoadingButton.jsx";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from './../store/api.js'
import Swal from 'sweetalert2';
class Profile extends React.Component {
    state = {
        modalOpen: false,
        isLoading: false,
        currentPasswordType: true,
        newPasswordType: true,
        user: {}
    }
    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }
    togglePasswordType = password => {
        if (password === 'current') {
            this.setState({ currentPasswordType: !this.state.currentPasswordType });
        }
        else {
            this.setState({ newPasswordType: !this.state.newPasswordType });
        }
    }
    changePassword = (data) => {
        this.setState({ isLoading: true })
        const post = {
            ...data,
            user_id: this.props.user_id
        }
        API.put(`user/password`, post)
            .then(res => {
                Swal.fire(
                    'Berhasil!',
                    'Password berhasil diubah',
                    'success'
                )
            })
            .catch(err => {
                Swal.fire(
                    'Gagal!',
                    'Password gagal diubah! Coba sekali lagi!',
                    'error'
                )
            })
            .finally(() => this.setState({ isLoading: false }));
    }
    componentDidMount = () => {
        API.get(`user/${this.props.user_id}`)
            .then(res => {
                this.setState({ user: res.data.user });
            })
            .catch(err => console.log(err))
    }
    render() {
        const { modalOpen, user, isLoading } = this.state;
        const changePasswordSchema = Yup.object().shape({
            new_password: Yup.string()
                .min(8, 'Password terlalu pendek')
                .required('Password baru wajib diisi!'),
            current_password: Yup.string()
                .required('Password sekarang wajib diisi!')
        })
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <CardBody className="pt-4 text-center">
                                    <Row>
                                        <Col className="col-12">
                                            <img
                                                alt="..."
                                                height="200"
                                                width="200"
                                                className="rounded-circle"
                                                style={{ border: "6px solid #eee", backgroundSize: "cover", objectFit: "cover" }}
                                                src={`http://127.0.0.1:8000/storage/profiles/${user.profile}`}
                                            />
                                        </Col>
                                        <Col className="col-12">
                                            <Button onClick={this.toggleModal} style={{ marginTop: "1rem" }} color="primary" size="md">Ubah Gambar Profile</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h3 className="mb-0">Akun Saya</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="pl-lg-4">
                                        {user.name ? <Row>
                                            <Col lg="12">
                                                <h3>Nama</h3>
                                                <h5>{user.name}</h5>
                                            </Col>
                                            <Col lg="12" style={{ marginTop: "1.5rem" }}>
                                                <h3>Email</h3>
                                                <h5>{user.email}</h5>
                                            </Col>
                                        </Row> : <Row><Col xs={12}><p className="text-center">Loading...</p></Col></Row>}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="mt-2">
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h3 className="mb-0">Ubah Password</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Formik
                                        initialValues={{
                                            current_password: '',
                                            new_password: ''
                                        }}
                                        validationSchema={changePasswordSchema}
                                        onSubmit={(data, actions) => {
                                            this.changePassword(data)
                                                .then(() => {
                                                    actions.resetForm();
                                                })
                                        }}
                                    >{({ errors, resetForm, touched, handleSubmit, handleChange, values }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col lg={12}>
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="input-current-password">
                                                            Password Sekarang
                                                    </label>
                                                        <InputGroup>
                                                            <Input onChange={handleChange} value={values.current_password} name="current_password" className="form-control-alternative" id="input-current-password" placeholder="Masukkan password sekarang..." type={this.state.currentPasswordType ? 'password' : 'text'} />
                                                            <InputGroupAddon addonType="append">
                                                                <Button type="button" color="primary" name="button-1" onClick={() => this.togglePasswordType('current')}>
                                                                    <i className="fas fa-eye text-white"></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                        {errors.current_password && touched.current_password ? (
                                                            <FormFeedback className="d-block">{errors.current_password}</FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12}>
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="input-new-password">
                                                            Password Baru
                                                        </label>
                                                        <InputGroup>
                                                            <Input onChange={handleChange} value={values.new_password} name="new_password" type={this.state.newPasswordType ? 'password' : 'text'} className="form-control-alternative" id="input-new-password" placeholder="Masukkan password baru..." />
                                                            <InputGroupAddon addonType="append">
                                                                <Button type="button" color="primary" name="button-1" onClick={() => this.togglePasswordType('new')}>
                                                                    <i className="fas fa-eye text-white"></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                        {errors.new_password && touched.new_password ? (
                                                            <FormFeedback className="d-block">{errors.new_password}</FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                    </Formik>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ProfileForm modal={modalOpen} toggle={this.toggleModal} />
            </>)
    }
}
const mapStateToProps = (state) => {
    return {
        user_id: state.auth.user.id
    }
}
export default connect(mapStateToProps)(Profile);
