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
import { Link } from 'react-router-dom';
import Loading from 'components/ui/Loading.jsx';
class PegawaiDetails extends Component {
    state = {
        pegawai: {},
        total_jam_dalam_minggu: [100, 200, 300, 400]
    }
    componentDidMount() {
        API().get(`user/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data.user)
                this.setState({ pegawai: res.data.user })
            })
            .catch(err => console.log(err))
    }
    render() {
        const barData = {
            labels: ['Minggu 1', 'Minggu 2', 'Minggu 3',
                'Minggu 4'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: '#57C3E7',
                    borderColor: '#57C3E7',
                    borderWidth: 2,
                    data: this.state.total_jam_dalam_minggu
                }
            ]
        }
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
                                        height="200"
                                        className="rounded-circle"
                                        src={`http://127.0.0.1:8000/storage/profiles/${this.state.pegawai.profile || 'default.jpg'}`}
                                    />
                                </CardBody>
                            </Card>
                            <Card className="mt-4 p-4">
                                <h2>Data Bulan Ini</h2>
                                <div style={{ width: "60%", margin: "auto" }}>
                                    <CircularProgressbarWithChildren style={{ width: "20px" }} value={24} maxValue={8 * moment().daysInMonth()}>
                                        <div className="text-center">
                                            <h1>24 / {8 * moment().daysInMonth()}</h1>
                                            <span>Jam</span>
                                        </div>
                                    </CircularProgressbarWithChildren>
                                </div>
                                <Row>
                                    <Col lg={6}>
                                        <div style={{ margin: "auto" }}>
                                            <CircularProgressbarWithChildren value={10} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#FFD600' } }}>
                                                <div className="text-center">
                                                    <h1>10x</h1>
                                                    <span>Lembur</span>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div style={{ margin: "auto" }}>
                                            <CircularProgressbarWithChildren value={7} maxValue={moment().daysInMonth()} styles={{ path: { stroke: '#F53A5F' } }}>
                                                <div className="text-center">
                                                    <h1>7x</h1>
                                                    <span>Terlambat</span>
                                                </div>
                                            </CircularProgressbarWithChildren>
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
                                            <Link to='/admin/pegawai'>
                                                <Button size="md" color="primary"><i className="fas fa-arrow-left"></i></Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="pl-lg-4">
                                        {this.state.pegawai.name ?
                                            <Row>
                                                <Col lg="6">
                                                    <h3>Nama</h3>
                                                    <h5>{this.state.pegawai.name}</h5>
                                                </Col>
                                                <Col lg="6">
                                                    <h3>Username</h3>
                                                    <h5>{this.state.pegawai.username}</h5>
                                                </Col>
                                                <Col lg="12" style={{ marginTop: "1rem" }}>
                                                    <h3>Email</h3>
                                                    <h5>{this.state.pegawai.email}</h5>
                                                </Col>
                                                <Col lg="12" style={{ marginTop: "1.5rem" }}>
                                                    <h3>No. Telp</h3>
                                                    <h5>{this.state.pegawai.nomor_handphone}</h5>
                                                </Col>
                                                <Col lg="12" style={{ marginTop: "1.5rem" }}>
                                                    <h3>Alamat</h3>
                                                    <h5>{this.state.pegawai.alamat}</h5>
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
                                    {this.state.total_jam_dalam_minggu == null ? <div className="d-flex justify-content-center"><Loading /></div> : <Bar
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

export default PegawaiDetails