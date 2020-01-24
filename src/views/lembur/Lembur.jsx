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
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Badge
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
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Lembur extends React.Component {
    state = {
        modalIsOpen: false,
        lembur: null,
        requestedLembur: []
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }
    getData = () => {
        API().get('lembur')
            .then(res => {
                console.log(res);
                this.setState({
                    lembur: res.data.data.others,
                    requestedLembur: res.data.data.waiting
                })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <>
                <Container className="mt--7">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h2 className="mb-0">Lembur</h2>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button color="primary" onClick={this.toggleModal} size="md">
                                                Permintaan Lembur
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.state.lembur === null ? <div className="d-flex justify-content-center"><Loading /></div> : <CardsContainer data={this.state.lembur} card={data => (
                                        <Card body className="mb-3 shadow">
                                            <Row>
                                                <Col lg={12} sm={12} className="col-6 col-sm-12">
                                                    <Row>
                                                        <Col className="col-4">
                                                            <Row>
                                                                <Col className="col-12">
                                                                    <img
                                                                        alt="..."
                                                                        height="200"
                                                                        style={{ borderRadius: "10px" }}
                                                                        src={`http://127.0.0.1:8000/storage/lembur/${data.foto || 'default.jpg'}`}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col className="col-8">
                                                            <CardTitle className="mb-2">
                                                                <Row>
                                                                    <Col lg={8}>
                                                                        <h2>{data.name}</h2>
                                                                        <h2><Badge color={data.status === 'diterima' ? 'success' : 'danger'}>{data.status === 'diterima' ? 'DITERIMA' : 'DITOLAK'}</Badge></h2>
                                                                    </Col>
                                                                    <Col lg={4} className="text-right">
                                                                        <span className="font-weight-bold d-block">{moment(data.tanggal).locale('id').fromNow()}</span>
                                                                        <span className="font-weight-bold">{data.lembur_awal}</span> - <span className="font-weight-bold">{data.lembur_akhir}</span>
                                                                    </Col>
                                                                </Row>
                                                            </CardTitle>
                                                            <CardText>
                                                                <span className="font-weight-bold d-block mt-lg-4">Keterangan : </span>
                                                                <p className="m-0">{data.keterangan}</p>
                                                            </CardText>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12} sm={12} className="col-6 col-sm-12 d-flex justify-content-sm-start justify-content-lg-end align-items-center">
                                                    <Button color="primary" onClick={() => this.props.history.push(`/admin/laporan-pegawai`)} size="md">
                                                        <i className="fas fa-eye mr-2"></i>
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
                    <PermintaanLembur getData={this.getData} data={this.state.requestedLembur} modal={this.state.modalIsOpen} toggle={this.toggleModal} />
                </Container>

            </>
        );
    }
}

export default withRouter(FadeIn(Lembur, Header));