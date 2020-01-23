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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    CardTitle,
    CardText,
    Container,
    Row,
    Col
} from "reactstrap";

import FadeIn from 'components/hoc/FadeIn.jsx';
import api from 'store/api.js';
import Loading from 'components/ui/Loading.jsx';

// core components
import {
    chartOptions,
    parseOptions
} from "variables/charts.jsx";
import { Link, withRouter } from 'react-router-dom'
import DashboardHeader from "components/Headers/DashboardHeader.jsx";
import "./../../assets/css/dashboard.css"
import { connect } from "react-redux";

const AbsenHariIni = ({ pegawai, history }) => (
    <Card body className="my-2">
        <Row>
            <Col lg={8} className="col-6">
                <CardTitle className="m-0">{pegawai.name}</CardTitle>
                <CardText>
                    <span className="font-weight-bold">{pegawai.absensi_masuk}</span>{pegawai.absensi_keluar && (<span className="font-weight-bold"> - {pegawai.absensi_keluar}</span>)}
                </CardText>
            </Col>
            <Col lg={4} className="col-6 text-right">
                <Button color="white" className="w-70 h-70" onClick={() => history.push(`/admin/detail-absensi/${pegawai.id}`)}>
                    <i className="fas fa-eye text-primary"></i>
                </Button>
            </Col>
        </Row>
    </Card>
);

const BelumAbsenHariIni = ({ pegawai, history }) => (
    <Col lg={12} className="col-12">
        <Card className="bg-gradient-default my-2" body>
            <Row className="align-items-center">
                <Col lg={8} className="col-6">
                    <CardTitle className="m-0"><h4 className="text-white">{pegawai.name}</h4></CardTitle>
                </Col>
                <Col lg={4} className="col-6 d-flex justify-content-end">
                    <Button color="white" className="w-70 h-70" onClick={() => history.push(`/admin/detail-pegawai/${pegawai.id}}`)}>
                        <i className="fas fa-eye text-primary"></i>
                    </Button>
                </Col>
            </Row>
        </Card>
    </Col>
);

class Dashboard extends React.Component {
    state = {
        activeNav: 1,
        chartExample1Data: "data1",
        pegawai: {
            absen_tercepat: [],
            belum_absen: []
        },
        loading: {
            pegawai_absen_tercepat: true,
            pegawai_belum_absen: true
        }
    };
    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            activeNav: index,
            chartExample1Data:
                this.state.chartExample1Data === "data1" ? "data2" : "data1"
        });
        let wow = () => {
            console.log(this.state);
        };
        wow.bind(this);
        setTimeout(() => wow(), 1000);
        // this.chartReference.update();
    };
    // componentDidMount() {

    // }
    componentWillMount() {
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
        api().get('dashboard')
            .then(response => {
                const { pegawai_sudah_absen, pegawai_belum_absen } = response.data.data;
                this.setState({
                    pegawai: {
                        ...this.state.pegawai,
                        absen_tercepat: pegawai_sudah_absen,
                        belum_absen: pegawai_belum_absen
                    }
                }, () => this.setState({
                    loading: {
                        ...this.state.loading,
                        pegawai_absen_tercepat: false,
                        pegawai_belum_absen: false
                    }
                }));
            });
    }
    render() {
        return (
            <>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col xl="6">
                            <Card className="shadow absensi-card">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className=" mb-0">Absensi Hari Ini</h2>
                                        </div>
                                        <div className="col">
                                            <Nav className="justify-content-end mt-3 mt-xl-0" pills>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 1
                                                        })}
                                                        href="/"
                                                        onClick={e => { e.preventDefault(); this.props.history.push('/admin/absensi') }}
                                                    >
                                                        Lihat Semua
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="justify-content-center">
                                            {
                                                !this.state.loading.pegawai_absen_tercepat ? this.state.pegawai.absen_tercepat.length ? this.state.pegawai.absen_tercepat.map(pegawai => (
                                                    <Col xl={12} className="col-12">
                                                        <AbsenHariIni {...this.props} pegawai={pegawai} />
                                                    </Col>
                                                )) : (
                                                    <h4 className="text-muted">Belum ada pegawai yang absen.</h4>
                                                ) : (
                                                    <Col className="d-flex justify-content-center">
                                                        <Loading />
                                                    </Col>
                                                )
                                            }
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="mb-5 mb-xl-0" xl="6">
                            <Card className="bg-gradient-default shadow lembur-card">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-white mb-0">Belum Absen Hari Ini</h2>
                                        </div>
                                        <div className="col">
                                            <Nav className="justify-content-end mt-3 mt-xl-0" pills>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 1
                                                        })}
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 1)}
                                                    >
                                                        Lihat Semua
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="justify-content-center">
                                    {
                                        !this.state.loading.pegawai_belum_absen ? this.state.pegawai.belum_absen.length ? this.state.pegawai.belum_absen.map(pegawai => (
                                            <Col xl={12} className="col-12">
                                                <BelumAbsenHariIni {...this.props} pegawai={pegawai} />
                                            </Col>
                                        )) : (
                                            <h4 className="text-muted">Semua pegawai sudah absen.</h4>
                                        ) : (
                                            <Col className="d-flex justify-content-center">
                                                <Loading />
                                            </Col>
                                        )
                                    }
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>

                </Container>
            </>
        );
    }
}

export default connect()(withRouter(FadeIn(Dashboard, DashboardHeader)));
