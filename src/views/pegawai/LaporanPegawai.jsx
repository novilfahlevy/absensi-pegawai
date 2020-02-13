import React from 'react';
import moment from 'moment';
import 'moment/locale/id';
import axios from 'axios';
import PieChart from './../../components/ui/PieChart.jsx';
import { Line } from 'react-chartjs-2'
import Header from "components/Headers/Header.jsx";
import Table from 'components/ui/Table.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Loading from 'components/ui/Loading.jsx';
import API from 'store/api.js'
import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Container,
    Button,
    Row,
    Input,
    FormGroup,
    Label
} from "reactstrap";
class LaporanPegawai extends React.Component {
    state = {
        pegawai: [],
        statusPegawai: null,
        total_jam_per_bulan: null,
        bulan: 1,
        tahun: moment().year(),
        data_kedua: {
            statusPegawai: null,
            total_jam_per_bulan: null
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleExportSelected = () => {
        axios({
            url: `${process.env.REACT_APP_BASE_URL}backend/api/absensi/laporan/export/${this.state.bulan}/${this.state.tahun}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Laporan.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }
    handleExport = () => {
        axios({
            url: `${process.env.REACT_APP_BASE_URL}backend/api/absensi/laporan/export`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Laporan.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }
    handleCariClick = () => {
        API().get(`absensi/laporan/cari/${this.state.bulan}/${this.state.tahun}`)
            .then(res => {
                console.log(res);
                const { data } = res.data;
                this.setState({
                    data_kedua: {
                        statusPegawai: [data.status_pegawai.terlambat, data.status_pegawai.tepat_waktu, data.status_pegawai.overwork],
                        total_jam_per_bulan: data.total_jam_per_bulan
                    }
                })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        API().get('absensi/laporan')
            .then(res => {
                const { data } = res.data;
                this.setState({
                    pegawai: data.total_jam_pegawai,
                    total_jam_per_bulan: data.total_jam_per_bulan,
                    data_kedua: { total_jam_per_bulan: data.total_jam_per_bulan, statusPegawai: [data.status_pegawai.terlambat, data.status_pegawai.tepat_waktu, data.status_pegawai.overwork] },
                    statusPegawai: [data.status_pegawai.terlambat, data.status_pegawai.tepat_waktu, data.status_pegawai.overwork]
                }, () => {
                    this.setState({ pegawai: this.state.pegawai });
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const columns = [{
            dataField: 'name',
            text: 'Nama',
            sort: true
        }, {
            dataField: 'total_terlambat',
            text: 'Total Terlambat',
            align: 'center',
            headerStyle: { backgroundColor: '#ce2d2d', color: '#fff' },
            sort: true
        }, {
            dataField: 'total_tepat_waktu',
            text: 'Total Tepat Waktu',
            headerStyle: { backgroundColor: '#2DCE89', color: '#fff' },
            align: 'center',
            sort: true
        }, {
            dataField: 'total_lembur',
            text: 'Total Lembur',
            headerStyle: { backgroundColor: '#6b2dce', color: '#fff' },
            align: 'center',
            sort: true
        }, {
            dataField: 'total_jam_kerja',
            text: 'Total Jam Kerja',
            headerStyle: { backgroundColor: '#ceb32d', color: '#fff' },
            align: 'center',
            sort: true
        }];
        const { pegawai } = this.state
        const second_line_data = {
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
                    data: this.state.data_kedua.total_jam_per_bulan
                }
            ]
        }
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
        const second_pie_data = {
            labels: ['Terlambat', 'Tepat Waktu', 'Overwork'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: ['#F44336', '#43A047', '#FB8C00',],
                    hoverBackgroundColor: ['#D50000', '#388E3C', '#F57C00',
                    ],
                    data: this.state.data_kedua.statusPegawai
                }
            ]
        }
        const pie_data = {
            labels: ['Terlambat', 'Tepat Waktu', 'Overwork'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: ['#F44336', '#43A047', '#FB8C00',],
                    hoverBackgroundColor: ['#D50000', '#388E3C', '#F57C00',
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
                                        <Col xs="6">
                                            <h2 className="mb-0">Laporan Pegawai Bulan Ini ({moment().locale('id').format('MMMM')})</h2>
                                        </Col>
                                        <Col className="text-right" xs="6">
                                            <Button color="success" onClick={this.handleExport} size="md">
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
                                            <h2 className="mb-0">Cari Data Per Bulan Lainnya</h2>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col className="col-4">
                                                    <Row>
                                                        <Col className="col-6">
                                                            <FormGroup>
                                                                <Label for="exampleSelect">Pilih Bulan</Label>
                                                                <Input type="select" name="bulan" id="exampleSelect" onChange={this.handleChange}>
                                                                    <option value="1">Januari</option>
                                                                    <option value="2">Februari</option>
                                                                    <option value="3">Maret</option>
                                                                    <option value="4">April</option>
                                                                    <option value="5">Mei</option>
                                                                    <option value="6">Juni</option>
                                                                    <option value="7">Juli</option>
                                                                    <option value="8">Agustus</option>
                                                                    <option value="9">September</option>
                                                                    <option value="10">Oktober</option>
                                                                    <option value="11">November</option>
                                                                    <option value="12">Desember</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="col-6">
                                                            <FormGroup>
                                                                <Label for="exampleSelect">Pilih Tahun</Label>
                                                                <Input type="select" name="tahun" id="exampleSelect" onChange={this.handleChange}>
                                                                    <option value={moment().year()}>{moment().year()}</option>
                                                                    <option value={moment().subtract(1, 'year').year()}>{moment().subtract(1, 'year').year()}</option>
                                                                    <option value={moment().subtract(2, 'year').year()}>{moment().subtract(2, 'year').year()}</option>
                                                                    <option value={moment().subtract(3, 'year').year()}>{moment().subtract(3, 'year').year()}</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="col-12 mb-2">
                                                            <Button onClick={this.handleCariClick} disabled={this.state.data_kedua.bulan === 0 && this.state.data_kedua.tahun === 0 ? true : false} color="primary" className="w-100" size="md">
                                                                <i className="fas fa-search mr-2"></i>
                                                                Cari
                                                                </Button>
                                                        </Col>
                                                        <Col className="col-12">
                                                            <Button onClick={this.handleExportSelected} disabled={this.state.data_kedua.bulan === 0 && this.state.data_kedua.tahun === 0 ? true : false} color="success" className="w-100" size="md">
                                                                <i className="fas fa-file mr-2"></i>
                                                                Export Laporan
                                                                </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-4">{this.state.data_kedua.total_jam_per_bulan == null ? <div className="d-flex justify-content-center"><Loading /></div> : <Line
                                                    data={second_line_data}
                                                    options={{
                                                        legend: {
                                                            display: false,
                                                        }
                                                    }}
                                                />}</Col>
                                                <Col className="col-4"> {this.state.data_kedua.statusPegawai == null ? <div className="d-flex justify-content-center"><Loading /></div> : <PieChart data={second_pie_data} title={"something"} />}</Col>
                                            </Row>
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