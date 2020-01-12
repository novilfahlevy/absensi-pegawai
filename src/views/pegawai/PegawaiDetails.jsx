import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Container,
    Row,
    Col
} from "reactstrap";
import React, { Component } from 'react';
import Header from "components/Headers/Header.jsx";
import API from './../../store/api.js'
import { Link } from 'react-router-dom';
class PegawaiDetails extends Component {
    state = {
        pegawai: {}
    }
    getData() {

    }
    componentDidMount() {
        API.get(`users/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ pegawai: res.data })
                console.log(this.state.pegawai)
            })
            .catch(err => console.log(err))
    }
    render() {
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
                                        src={require("assets/img/theme/team-4-800x800.jpg")}
                                    />
                                </CardBody>
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
                                        {this.state.pegawai.username ?
                                            <Row>
                                                <Col lg="12">
                                                    <h3>Username</h3>
                                                    <h5>{this.state.pegawai.username}</h5>
                                                </Col>
                                                <Col lg="12" style={{ marginTop: "1rem" }}>
                                                    <h3>Email</h3>
                                                    <h5>{this.state.pegawai.email}</h5>
                                                </Col>
                                                <Col md="12" style={{ marginTop: "1rem" }}>
                                                    <h3>Address</h3>
                                                    <h5>{this.state.pegawai.phone}</h5>
                                                </Col>
                                            </Row> : <p className="text-center">Loading...</p>}
                                    </div>
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