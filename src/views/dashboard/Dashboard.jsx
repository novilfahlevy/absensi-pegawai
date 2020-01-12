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

// core components
import {
    chartOptions,
    parseOptions
} from "variables/charts.jsx";
import { Link } from 'react-router-dom'
import DashboardHeader from "components/Headers/DashboardHeader.jsx";
import "./../../assets/css/dashboard.css"
class Dashboard extends React.Component {
    state = {
        activeNav: 1,
        chartExample1Data: "data1"
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
    componentWillMount() {
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }
    render() {
        return (
            <>
                <DashboardHeader />
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
                                    <Row>
                                        <Col xl={12} className="col-12">
                                            <Card body className="my-2">
                                                <Row>
                                                    <Col lg={8} className="col-6">
                                                            <CardTitle className="m-0">Alisa</CardTitle>
                                                            <CardText>
                                                                <span className="font-weight-bold">8:30</span> - <span className="font-weight-bold">16:30</span>
                                                            </CardText>
                                                        </Col>
                                                        <Col lg={4} className="col-6 text-right">
                                                            <Link className="text-white" to={``}>
                                                                <Button color="white" className="w-70 h-70">
                                                                    <i className="fas fa-eye text-primary"></i>
                                                                </Button>
                                                            </Link>
                                                        </Col>
                                                </Row>
                                            </Card>
                                            <Card body className="my-2">
                                                <Row>
                                                    <Col lg={8} className="col-6">
                                                        <CardTitle className="m-0">Andy Rachmat</CardTitle>
                                                        <CardText>
                                                            <span className="font-weight-bold">8:30</span> - <span className="font-weight-bold">17:30</span>
                                                        </CardText>
                                                    </Col>
                                                    <Col lg={4} className="col-6 text-right">
                                                        <Link className="text-white" to={``}>
                                                            <Button color="white" className="w-70 h-70">
                                                                <i className="fas fa-eye text-primary"></i>
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
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
                                            <h2 className="text-white mb-0">Pengajuan Lembur</h2>
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
                                    <Row>
                                        <Col lg={12} className="col-12">
                                            <Card className="bg-gradient-default text-white my-2" body>
                                                <Row>
                                                    <Col lg={8} className="col-6">
                                                        <CardTitle className="m-0">Bayu Setiawan</CardTitle>
                                                        <CardText>
                                                            Sampai Jam <span className="font-weight-bold">17:30</span>
                                                        </CardText>
                                                    </Col>
                                                    <Col lg={4} className="col-6 d-flex justify-content-end align-items-center">
                                                        <Link className="text-white" to={``} style={{ marginRight: "1rem" }}>
                                                            <Button className="w-70 h-70 bg-success text-white">
                                                                <i className="fas fa-check text-white"></i>
                                                            </Button>
                                                        </Link>
                                                        <Link className="text-white" to={``}>
                                                            <Button className="w-70 h-70 bg-danger text-white">
                                                                <i className="fas fa-times text-white"></i>
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Card className="bg-gradient-default text-white my-2" body>
                                                <Row>
                                                    <Col lg={8} className="col-6">
                                                        <CardTitle className="m-0">Fadhil Dhanendra</CardTitle>
                                                        <CardText>
                                                            Sampai Jam <span className="font-weight-bold">20:00</span>
                                                        </CardText>
                                                    </Col>
                                                    <Col lg={4} className="col-6 d-flex justify-content-end align-items-center">
                                                        <Link className="text-white" to={``} style={{ marginRight: "1rem" }}>
                                                            <Button className="w-70 h-70 bg-success text-white">
                                                                <i className="fas fa-check text-white"></i>
                                                            </Button>
                                                        </Link>
                                                        <Link className="text-white" to={``}>
                                                            <Button className="w-70 h-70 bg-danger text-white">
                                                                <i className="fas fa-times text-white"></i>
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
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

export default Dashboard;
