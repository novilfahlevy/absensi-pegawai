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
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import moment from 'moment'
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
    InputGroupAddon

} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import ProfileForm from "./ProfileForm.jsx";
import LoadingButton from "./../components/ui/LoadingButton.jsx";
import Loading from "./../components/ui/Loading.jsx";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from './../store/api.js'
import Swal from 'sweetalert2';
import FadeIn from 'components/hoc/FadeIn.jsx';
class Profile extends React.Component {
    state = {
        modalOpen: false,
        isLoading: false,
        currentPassword: '',
        currentPasswordType: true,
        newPassword: '',
        newPasswordType: true,
        newPasswordConfirmation: '',
        newPasswordConfirmationType: true,
        user: {}
    }
    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }
    togglePasswordType = password => {
        if (password === 'current') {
            this.setState({ currentPasswordType: !this.state.currentPasswordType });
        }
        else if (password === 'new') {
            this.setState({ newPasswordType: !this.state.newPasswordType });
        }
        else {
            this.setState({ newPasswordConfirmationType: !this.state.newPasswordConfirmationType });
        }
    }
    changePassword = (data, resetForm) => {
        this.setState({ isLoading: true })
        const post = {
            ...data,
            user_id: this.props.user_id
        }
        API().post(`user/password`, post)
            .then(res => {
                resetForm();
                Swal.fire(
                    'Berhasil!',
                    'Password berhasil diubah',
                    'success'
                )
            })
            .catch(err => {
                if (err.response.status === 422) {
                    Swal.fire(
                        'Gagal!',
                        'Password lama anda salah!',
                        'error'
                    )
                }
                else {
                    Swal.fire(
                        'Gagal!',
                        'Password gagal diubah! Coba sekali lagi!',
                        'error'
                    )
                }
            })
            .finally(() => this.setState({ isLoading: false }));
    }
    getData = () => {
        API().get(`user/${this.props.user_id}`)
            .then(res => {
                this.setState({ user: res.data.user }, () => console.log(this.state.user.jam_kerja.performance));
            })
            .catch(err => console.log(err))
    }
    componentDidMount = () => {
        this.getData();
    }
    render() {
        const { modalOpen, user } = this.state;

        Yup.addMethod(Yup.string, 'passwordConfirm', message => Yup.mixed().test({
            name: 'passwordConfirm',
            exclusive: false,
            message,
            test: function (value) { return value === this.resolve(Yup.ref('new_password')) }
        }));

        const changePasswordSchema = Yup.object().shape({
            new_password: Yup.string()
                .min(8, 'Password terlalu pendek')
                .required('Password baru wajib diisi!'),
            new_password_confirmation: Yup.string()
                .passwordConfirm('Password tidak cocok!'),
            current_password: Yup.string()
                .required('Password sekarang wajib diisi!')
        })
        return (
            <>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <CardBody className="text-center">
                                    <Row>
                                        <Col className="col-12 d-flex justify-content-center">
                                            {user.profile ? <img
                                                alt="..."
                                                height="200"
                                                width="200"
                                                className="rounded-circle"
                                                style={{ border: "6px solid #eee", backgroundSize: "cover", objectFit: "cover" }}
                                                src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${user.profile}`}
                                            /> : (
                                                    <div
                                                        className="d-flex justify-content-center align-items-center" style={{
                                                            width: '200px',
                                                            height: '200px',
                                                            border: '6px solid #eee',
                                                            borderRadius: "50%"
                                                        }}
                                                    >
                                                        <Loading />
                                                    </div>
                                                )}
                                        </Col>
                                        <Col className="col-12">
                                            <Button onClick={this.toggleModal} style={{ marginTop: "1rem" }} color="primary" size="md">Ubah Gambar Profile</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card className="mt-4 p-4">
                                <div style={{ width: "60%", margin: "auto" }}>
                                    {user.jam_kerja ? <CircularProgressbarWithChildren style={{ width: "20px" }} value={user.jam_kerja.performance.total_jam_per_minggu} maxValue={8 * moment().daysInMonth()}>
                                        <div className="text-center">
                                            <h3>{user.jam_kerja.performance.total_jam_per_minggu} / {8 * moment().daysInMonth()}</h3>
                                            <span className="text-sm">Jam</span>
                                        </div>
                                    </CircularProgressbarWithChildren> : <div className="d-flex justify-content-center"><Loading /></div>}
                                </div>
                                <Row>
                                    <Col lg={6}>
                                        <div style={{ margin: "auto" }}>
                                            {user.jam_kerja ? <CircularProgressbarWithChildren value={user.jam_kerja.performance.total_lembur} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#FFD600' } }}>
                                                <div className="text-center">
                                                    <h3>{user.jam_kerja.performance.total_lembur}x</h3>
                                                    <span className="text-sm">Lembur</span>
                                                </div>
                                            </CircularProgressbarWithChildren> : <div className="d-flex justify-content-center"><Loading /></div>}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div style={{ margin: "auto" }}>
                                            {user.jam_kerja ? <CircularProgressbarWithChildren value={user.jam_kerja.performance.terlambat} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#F53A5F' } }}>
                                                <div className="text-center">
                                                    <h3>{user.jam_kerja.performance.terlambat}x</h3>
                                                    <span className="text-sm">Terlambat</span>
                                                </div>
                                            </CircularProgressbarWithChildren> : <div className="d-flex justify-content-center"><Loading /></div>}
                                        </div>
                                    </Col>
                                </Row>
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
                                            <Col lg="6">
                                                <h3>Nama</h3>
                                                <h5>{user.name}</h5>
                                            </Col>
                                            <Col className="mt-4 mt-lg-0" lg="6">
                                                <h3>Email</h3>
                                                <h5>{user.email}</h5>
                                            </Col>
                                            <Col className="mt-4" lg="6">
                                                <h3>Username</h3>
                                                <h5>{user.username}</h5>
                                            </Col>
                                            <Col className="mt-4" lg="6">
                                                <h3>Alamat</h3>
                                                <h5>{user.alamat}</h5>
                                            </Col>
                                            <Col className="mt-4" lg="6">
                                                <h3>Nomor Ponsel</h3>
                                                <h5>{user.nomor_handphone}</h5>
                                            </Col>
                                            <Col className="mt-4" lg="6">
                                                <h3>Job</h3>
                                                <h5>{user.job}</h5>
                                            </Col>
                                            <Col className="mt-4" lg="6">
                                                <h3>Role</h3>
                                                <h5>{user.roles[0].name}</h5>
                                            </Col>
                                        </Row> : <Row><Col xs={12} className="d-flex justify-content-center"><Loading /></Col></Row>}
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
                                            new_password: '',
                                            new_password_confirmation: ''
                                        }}
                                        validationSchema={changePasswordSchema}
                                        onSubmit={(data, actions) => {
                                            this.changePassword(data, actions.resetForm)
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
                                                                    <i className={`fas fa-eye${!this.state.currentPasswordType ? '-slash' : ''} text-white`}></i>
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
                                                                    <i className={`fas fa-eye${!this.state.newPasswordType ? '-slash' : ''} text-white`}></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                        {errors.new_password && touched.new_password ? (
                                                            <FormFeedback className="d-block">{errors.new_password}</FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12}>
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="input-new-password-confirmation">
                                                            Konfirmasi Password Baru
                                                        </label>
                                                        <InputGroup>
                                                            <Input onChange={handleChange} value={values.new_password_confirmation} name="new_password_confirmation" type={this.state.newPasswordConfirmationType ? 'password' : 'text'} className="form-control-alternative" id="input-new-password-confirmation" placeholder="Masukan ulang password baru..." />
                                                            <InputGroupAddon addonType="append">
                                                                <Button type="button" color="primary" name="button-1" onClick={() => this.togglePasswordType('confirmation')}>
                                                                    <i className={`fas fa-eye${!this.state.newPasswordConfirmationType ? '-slash' : ''} text-white`}></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                        {errors.new_password_confirmation && touched.new_password_confirmation ? (
                                                            <FormFeedback className="d-block">{errors.new_password_confirmation}</FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                    <LoadingButton color="primary" condition={this.state.isLoading} type="submit">Ubah Password</LoadingButton>
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
                <ProfileForm getData={this.getData} modal={modalOpen} toggle={this.toggleModal} />
            </>)
    }
}
const mapStateToProps = (state) => {
    return {
        user_id: state.auth.user.id
    }
}
export default connect(mapStateToProps)(FadeIn(Profile, UserHeader));
