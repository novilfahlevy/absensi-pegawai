import React from 'react';
import PieChart from './../../components/ui/PieChart.jsx';
import { Bar, Line } from 'react-chartjs-2'
import Header from "components/Headers/Header.jsx";
import {
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Pagination,
    PaginationItem,
    PaginationLink,
    Col,
    Container,
    Button,
    Row,
    InputGroup,
    Input,
    InputGroupAddon,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form
} from "reactstrap";
class LaporanPegawai extends React.Component {
    state = {
        line_data: {
            labels: ['January', 'February', 'March',
                'April', 'May'],
            datasets: [
                {
                    label: 'Total Jam',
                    fill: true,
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#118EEF',
                    borderWidth: 2,
                    data: [65, 59, 80, 81, 56]
                }
            ]
        },
        pie_data: {
            labels: ['Terlambat', 'Tepat Waktu', 'Overwork'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [
                        '#FF6384',
                        '#C9DE00',
                        '#2FDE00',
                    ],
                    hoverBackgroundColor: [
                        '#501800',
                        '#4B5000',
                        '#175000',
                    ],
                    data: [65, 59, 80]
                }
            ]
        }
    }
    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h2 className="mb-0">Laporan Pegawai</h2>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button color="success" onClick={() => this.props.history.push(`/admin/laporan-pegawai`)} size="md">
                                                <i className="fas fa-file mr-2"></i>
                                                Export Laporan
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                            </Card>
                            <Row className="mt-4">
                                <Col lg={6} sm={6}>
                                    <Card>
                                        <CardHeader>
                                            <h3 className="mb-0"> Jam Kerja Pegawai</h3>
                                        </CardHeader>
                                        <CardBody className="p-4" >
                                            <Line
                                                data={this.state.line_data}
                                                options={{
                                                    legend: {
                                                        display: false,
                                                    }
                                                }}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <Card>
                                        <CardHeader>
                                            <h3 className="mb-0">Status Kehadiran Pegawai</h3>
                                        </CardHeader>
                                        <CardBody className="p-4">
                                            <PieChart data={this.state.pie_data} title={"something"} />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-12">
                                    <Card></Card>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>

            </>
        )
    }
}

export default LaporanPegawai;