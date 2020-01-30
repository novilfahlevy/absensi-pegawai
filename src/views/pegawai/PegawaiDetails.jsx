import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col
} from "reactstrap";
import moment from 'moment';
import 'moment/locale/id';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import React, { Component } from 'react';
import Header from "components/Headers/Header.jsx";
import API from './../../store/api.js'
import { Bar } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import Loading from 'components/ui/Loading.jsx';
class PegawaiDetails extends Component {
    state = {
        pegawai: {},
        total_jam_dalam_minggu: [100, 200, 300, 400],
        jam_kerja: {}
    }
    componentDidMount() {
        API().get(`user/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data.user   )
                this.setState({ pegawai: res.data.user, jam_kerja: res.data.user.jam_kerja })
            })
            .catch(err => console.log(err))
    }
    render() {
        const barData = {
            labels: ['Minggu 1', 'Minggu 2', 'Minggu 3',
                'Minggu 4'],
            datasets: [
                {
                    label: 'Total Jam Kerja',
                    backgroundColor: '#57C3E7',
                    borderColor: '#57C3E7',
                    borderWidth: 2,
                    data: [this.state.jam_kerja.minggu1, this.state.jam_kerja.minggu2, this.state.jam_kerja.minggu3, this.state.jam_kerja.minggu4]
                }
            ]
        }
        const { pegawai, jam_kerja } = this.state;
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <CardBody className="pt-0 pt-md-4 text-center">
                                    <img
                                        alt="..."
                                        height="250"
                                        className="rounded-circle"
                                        src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${pegawai.profile || 'default.jpg'}`}
                                        width="100%"
                                    />
                                </CardBody>
                            </Card>
                            <Card className="mt-4 p-4">
                                <h2>Data Bulan Ini</h2>
                                <div style={{ width: "60%", margin: "auto" }}>
                                    {jam_kerja.performance ? <CircularProgressbarWithChildren style={{ width: "20px" }} value={jam_kerja.performance.total_jam_per_minggu} maxValue={8 * moment().daysInMonth()}>
                                        <div className="text-center mt-3">
                                            <h2>{jam_kerja.performance.total_jam_per_minggu} / {8 * moment().daysInMonth()}</h2>
                                            <p className="font-weight-bold">Jam</p>
                                        </div>
                                    </CircularProgressbarWithChildren> : <div className="d-flex justify-content-center"><Loading /></div>}
                                </div>
                                <Row>
                                    <Col lg={12} className="mt-3">
                                        <div style={{ width: "60%", margin: "auto" }}>
                                            {jam_kerja.performance ? <CircularProgressbarWithChildren value={jam_kerja.performance.total_lembur} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#FFD600' } }}>
                                                <div className="text-center mt-3">
                                                    <h1>{jam_kerja.performance.total_lembur}x</h1>
                                                    <p className="mt-0">Lembur</p>
                                                </div>
                                            </CircularProgressbarWithChildren> : <div className="d-flex justify-content-center"><Loading /></div>}
                                        </div>
                                    </Col>
                                    <Col lg={12} className="mt-3">
                                        <div style={{ width: "60%", margin: "auto" }}>
                                            {jam_kerja.performance ? <CircularProgressbarWithChildren value={jam_kerja.performance.terlambat} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#F53A5F' } }}>
                                                <div className="text-center mt-3">
                                                    <h1>{jam_kerja.performance.terlambat}x</h1>
                                                    <p className="mt--1">Terlambat</p>
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
                                        <Col xs="8">
                                            <h3 className="mb-0">Detail Pegawai</h3>
                                        </Col>
                                        <Col xs="4" className="text-right">
                                            <Button size="md" color="primary" onClick={() => this.props.history.goBack()}>
                                                <i className="fas fa-arrow-left"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="pl-lg-4">
                                        {pegawai.name ?
                                            <Row>
                                                <Col lg="6">
                                                    <h3>Nama</h3>
                                                    <h5>{pegawai.name}</h5>
                                                </Col>
                                                <Col className="mt-4 mt-lg-0" lg="6">
                                                    <h3>Email</h3>
                                                    <h5>{pegawai.email}</h5>
                                                </Col>
                                                <Col className="mt-4" lg="6">
                                                    <h3>Username</h3>
                                                    <h5>{pegawai.username}</h5>
                                                </Col>
                                                <Col className="mt-4" lg="6">
                                                    <h3>Alamat</h3>
                                                    <h5>{pegawai.alamat}</h5>
                                                </Col>
                                                <Col className="mt-4" lg="6">
                                                    <h3>Nomor Telepon</h3>
                                                    <h5>{pegawai.nomor_handphone}</h5>
                                                </Col>
                                                <Col className="mt-4" lg="6">
                                                    <h3>Job</h3>
                                                    <h5>{pegawai.job}</h5>
                                                </Col>
                                                <Col className="mt-4" lg="6">
                                                    <h3>Role</h3>
                                                    <h5>{pegawai.roles[0].name}</h5>
                                                </Col>
                                            </Row> : <Row><Col className="d-flex justify-content-center"><Loading /></Col></Row>}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="shadow mt-4">
                                <CardHeader>
                                    <h3 className="mb-0"> Jam Kerja Pegawai</h3>
                                </CardHeader>
                                <CardBody className="p-4" >
                                    {jam_kerja.minggu1 == null ? <div className="d-flex justify-content-center"><Loading /></div> : <Bar
                                        data={barData}
                                        options={{
                                            legend: {
                                                display: false,
                                            }
                                        }}
                                    />}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(PegawaiDetails)