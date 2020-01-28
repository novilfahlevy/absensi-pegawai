import React from 'react';

import Header from 'components/Headers/Header.jsx';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    Button,
    FormGroup,
    Label,
    Input,
    Badge,
    InputGroupAddon,
    Form,
    InputGroup
} from 'reactstrap';

import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import FadeIn from 'components/hoc/FadeIn.jsx';
import PermintaanLembur from './PermintaanLembur.jsx'
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import 'moment/locale/id';
import CardsContainer from 'components/ui/CardsContainer.jsx';
import API from 'store/api.js';
import Loading from 'components/ui/Loading.jsx';
import user from 'user.js'
// import paginationFactory from 'react-bootstrap-table2-paginator';

class RiwayatLembur extends React.Component {
    state = {
        lembur: null,
        filterBulan: 1,
        filterTahun: moment().year(),
        cariKeyword: ''
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCariSubmit = e => {
        e.preventDefault();
        API().get(`lembur/cari/${this.state.cariKeyword}`)
            .then(res => {
                this.setState({
                    lembur: res.data.data.sort((a, b) => (a.tanggal > b.tanggal) ? 1 : -1)
                })
            })
            .catch(err => console.log(err))
    }
    handleReset = () => {
        this.setState({
            filterBulan: 1,
            filterTahun: moment().year(),
            cariKeyword: ''
        }, this.getData())
    }
    handleClick = () => {
        API().get(`lembur/filter/${user('role')}/${user('id')}/${this.state.filterBulan}/${this.state.filterTahun}`)
            .then(res => {
                this.setState({
                    lembur: res.data.data.sort((a, b) => (a.tanggal > b.tanggal) ? 1 : -1)
                })
            })
            .catch(err => console.log(err))
    }
    getData = () => {
        API().get(`lembur/${user('role')}/${user('id')}`)
            .then(res => {
                console.log(res);
                this.setState({
                    lembur: res.data.data.others.sort((a, b) => (a.tanggal > b.tanggal) ? 1 : -1)
                });
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const { filterTahun, filterBulan, cariKeyword } = this.state;
        let styles = {
            card: {
                border: "none",
                boxShadow: "-6px -6px 20px rgba(255, 255, 255, 1), 6px 6px 20px rgba(0, 0, 0, .3)",
            }
        }
        return (
            <>
                <Container className="mt--7">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h2 className="mb-0">Riwayat Lembur</h2>
                                        </Col>
                                        <Col xs="4" className="text-right">
                                            <Button size="md" color="primary" onClick={() => this.props.history.goBack()}>
                                                <i className="fas fa-arrow-left"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleCariSubmit}>
                                        <InputGroup className="mb-3">
                                            <Input value={cariKeyword} onChange={this.handleChange} type="search" name="cariKeyword" id="search" placeholder="Cari data lembur " />
                                            <InputGroupAddon addonType="append">
                                                <Button type="submit" color="primary">Cari</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Form>
                                    <Row>
                                        <Col className="col-5">
                                            <FormGroup>
                                                <Label for="exampleSelect">Pilih Bulan</Label>
                                                <Input onChange={this.handleChange} value={filterBulan} type="select" name="filterBulan" id="exampleSelect" >
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
                                        <Col className="col-4">
                                            <FormGroup>
                                                <Label for="exampleSelect">Pilih Tahun</Label>
                                                <Input onChange={this.handleChange} value={filterTahun} type="select" name="filterTahun" id="exampleSelect" >
                                                    <option value={moment().year()}>{moment().year()}</option>
                                                    <option value={moment().subtract(1, 'year').year()}>{moment().subtract(1, 'year').year()}</option>
                                                    <option value={moment().subtract(2, 'year').year()}>{moment().subtract(2, 'year').year()}</option>
                                                    <option value={moment().subtract(3, 'year').year()}>{moment().subtract(3, 'year').year()}</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-3 d-flex justify-items-center ">
                                            <Button onClick={this.handleClick} size="md" className="mr-2 h-50 my-auto" color="success">
                                                <i className="fas fa-filter mr-2"></i>
                                                Filter
                                            </Button>
                                            <Button onClick={this.handleReset} size="md" className="h-50 my-auto" color="danger" >
                                                <i className="fas fa-times mr-2"></i>
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                    {this.state.lembur === null ? <div className="d-flex justify-content-center"><Loading /></div> : <CardsContainer data={this.state.lembur} card={lembur => (
                                        <Card body style={styles.card} className={`permintaan-lembur-card mb-2 card-${lembur.id}`}>
                                            <Row>
                                                <Col lg={12} sm={12} className="col-6 col-sm-12">
                                                    <Row>
                                                        <Col className="col-4">
                                                            <img
                                                                alt="..."
                                                                height="200"
                                                                style={{ borderRadius: "10px" }}
                                                                src={`${process.env.REACT_APP_BASE_URL}storage/lembur/${lembur.foto || 'default.jpg'}`}
                                                            />
                                                        </Col>
                                                        <Col className="col-8">
                                                            <CardTitle className="mb-1">
                                                                <Row>
                                                                    <Col lg={6}>
                                                                        <h2>{lembur.name}</h2>
                                                                        <h2><Badge color={lembur.status !== 'diterima' ? 'danger' : 'success'}>{lembur.status !== 'diterima' ? 'DITOLAK' : 'DITERIMA'}</Badge></h2>
                                                                    </Col>
                                                                    <Col lg={6} className="text-right">
                                                                        <span className="font-weight-bold d-block">{moment(lembur.tanggal).locale('id').format('DD MMMM, Y')}</span>
                                                                        <span className="font-weight-bold">{moment(lembur.lembur_awal, 'HH:mm:ss').format('HH:mm')}</span> - <span className="font-weight-bold">{moment(lembur.lembur_akhir, 'HH:mm:ss').format('HH:mm')}</span>
                                                                    </Col>
                                                                </Row>
                                                            </CardTitle>
                                                            <CardText>
                                                                <span className="font-weight-bold d-block mt-lg-4">Keterangan : </span>
                                                                <p className="m-0">{lembur.keterangan}</p>
                                                            </CardText>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12} sm={12} className="col-6 col-sm-12 d-flex justify-content-sm-start justify-content-lg-end align-items-center">
                                                    <Button onClick={() => this.props.history.push(`/admin/detail-lembur/${lembur.id}`)} color="primary">
                                                        <i className="fas fa-eye text-white mr-2"></i>
                                                        Lihat Detail
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    )} />}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default withRouter(FadeIn(RiwayatLembur, Header));