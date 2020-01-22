import React from 'react';
import PieChart from './../../components/ui/PieChart.jsx';
import { Bar, Line } from 'react-chartjs-2'
import Header from "components/Headers/Header.jsx";
import Table from 'components/ui/Table.jsx';
import { selectFilter } from 'react-bootstrap-table2-filter';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Loading from 'components/ui/Loading.jsx';
import API from 'store/api.js'
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
        pegawai: [{}],
        bulan_sekarang: null,
        statusPegawai: null,
        total_jam_per_bulan: null
    }
    componentDidMount() {
        API().get('absensi/laporan')
            .then(res => {
                const { data } = res.data;
                this.setState({
                    pegawai: data.total_jam_pegawai,
                    total_jam_per_bulan: data.total_jam_per_bulan,
                    statusPegawai: [data.status_pegawai.terlambat, data.status_pegawai.tepat_waktu, data.status_pegawai.overwork]
                }, () => console.log(this.state.pegawai))
            })
            .catch(err => console.log(err))
    }
    render() {
        const columns = [{
            dataField: 'name',
            text: 'Nama',
            sort: true
        }, {
            dataField: 'minggu1',
            text: 'Minggu 1  (Jam)',
            align: 'center',
            sort: true
        }, {
            dataField: 'minggu2',
            text: 'Minggu 2 (Jam)',
            align: 'center',
            sort: true
        }, {
            dataField: 'minggu3',
            text: 'Minggu 3 (Jam)',
            align: 'center',
            sort: true
        }, {
            dataField: 'minggu4',
            text: 'Minggu 4 (Jam)',
            align: 'center',
            sort: true
        }];
        const { pegawai } = this.state
        const line_data = {
            labels: ['Minggu 1', 'Minggu 2', 'Minggu 3',
                'Minggu 4'],
            datasets: [
                {
                    label: 'Total Jam',
                    fill: true,
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#118EEF',
                    borderWidth: 2,
                    data: this.state.total_jam_per_bulan
                }
            ]
        }
        const pie_data = {
            labels: ['Terlambat', 'Tepat Waktu', 'Overwork'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [
                        '#F44336',
                        '#43A047',
                        '#FB8C00',
                    ],
                    hoverBackgroundColor: [
                        '#D50000',
                        '#388E3C',
                        '#F57C00',
                    ],
                    data: this.state.statusPegawai
                }
            ]
        }
        return (
            <>
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
                                    <Card className="shadow">
                                        <CardHeader>
                                            <h3 className="mb-0"> Jam Kerja Pegawai</h3>
                                        </CardHeader>
                                        <CardBody className="p-4" >
                                            {this.state.total_jam_per_bulan == null ? <div className="d-flex justify-content-center"><Loading /></div> : <Line
                                                data={line_data}
                                                options={{
                                                    legend: {
                                                        display: false,
                                                    }
                                                }}
                                            />}
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <Card className="shadow">
                                        <CardHeader>
                                            <h3 className="mb-0">Status Kehadiran Pegawai</h3>
                                        </CardHeader>
                                        <CardBody className="p-4">
                                            {this.state.statusPegawai == null ? <div className="d-flex justify-content-center"><Loading /></div> : <PieChart data={pie_data} title={"something"} />}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-12">
                                    <Card className="shadow mt-4">
                                        <CardHeader className="border-0">
                                            <h2 className="mb-0">Data Jam Kerja Pegawai</h2>
                                        </CardHeader>
                                        <CardBody>
                                            <Table data={pegawai} columns={columns}></Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>

            </>
        )
    }
}

export default FadeIn(LaporanPegawai, Header);