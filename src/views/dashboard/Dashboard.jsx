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
import { withRouter } from 'react-router-dom'
import DashboardHeader from "components/Headers/DashboardHeader.jsx";
import "./../../assets/css/dashboard.css"
import { connect } from "react-redux";

const AbsenHariIni = ({ pegawai, history, className }) => (
    <Card body className={`my-2 ${className}`}>
        <Row>
            <Col lg={8} className="col-6">
                <CardTitle className="m-0">{pegawai.name}</CardTitle>
                <CardText>
                    <span className="font-weight-bold">{pegawai.absensi_masuk.split(':').reverse().splice(1).reverse().join(':')}</span>{pegawai.absensi_keluar && (<span className="font-weight-bold"> - {pegawai.absensi_keluar.split(':').reverse().splice(1).reverse().join(':')}</span>)}
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

const IzinHariIni = ({ pegawai, history }) => (
    <Col lg={12} className="col-12">
        <Card className="bg-gradient-default my-2" body>
            <Row className="align-items-center">
                <Col className="col-12">
                    <CardTitle className="m-0"><h4 className="text-white">{pegawai.name}</h4></CardTitle>
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
            izin: []
        },
        loading: {
            pegawai_absen_tercepat: true,
            pegawai_izin: true
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
                const { pegawai_sudah_absen, pegawai_izin } = response.data.data;
                this.setState({
                    pegawai: {
                        ...this.state.pegawai,
                        absen_tercepat: pegawai_sudah_absen,
                        izin: pegawai_izin
                    }
                }, () => this.setState({
                    loading: {
                        ...this.state.loading,
                        pegawai_absen_tercepat: false,
                        pegawai_izin: false
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
                    <Col className="mb-5 mb-xl-0" xl="6">
                            <Card className="bg-gradient-default shadow lembur-card">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-white mb-0">Izin Hari Ini</h2>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="justify-content-center">
                                    {
                                        !this.state.loading.pegawai_izin ? this.state.pegawai.izin.length ? this.state.pegawai.izin.map(pegawai => (
                                            <Col key={pegawai.id} xl={12} className="col-12">
                                                <IzinHariIni key={pegawai.id} {...this.props} pegawai={pegawai} />
                                            </Col>
                                        )) : (
                                            <h4 className="text-muted">-</h4>
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
                                                !this.state.loading.pegawai_absen_tercepat ? this.state.pegawai.absen_tercepat.length ? this.state.pegawai.absen_tercepat.map((pegawai, i) => (
                                                    <Col key={i} xl={12} className="col-12">
                                                        <AbsenHariIni key={pegawai.id} {...this.props} pegawai={pegawai} className={i % 2 !== 0 && 'bg-purple text-white'} />
                                                    </Col>
                                                )) : (
                                                    <h4 className="text-muted">-</h4>
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
