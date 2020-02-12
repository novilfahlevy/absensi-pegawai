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
    Button
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import FadeIn from 'components/hoc/FadeIn.jsx';
import moment from 'moment';
import 'moment/locale/id';
import CardsContainer from 'components/ui/CardsContainer.jsx';
import API from 'store/api.js';
import Loading from 'components/ui/Loading.jsx';
import 'assets/css/permintaanLembur.css';
import user from 'user.js';
// import paginationFactory from 'react-bootstrap-table2-paginator';

class Lembur extends React.Component {
    state = {
        lembur: null
    }
    handleClick = (id, status) => {
        API().post(`lembur/${id}`, { status })
            .then(res => {
                document.querySelector(`.card-${id}`).style.display = "none";
                this.props.getData();
            })
            .catch(err => console.log(err))
    }
    getData = () => {
        API().get(`lembur/${user('role')}/${user('id')}`)
            .then(res => {
                this.setState({
                    lembur: res.data.data.waiting.sort((a, b) => (a.tanggal > b.tanggal) ? -1 : 1)
                });
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getData();
    }
    render() {
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
                                            <h2 className="mb-0">Lembur</h2>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button color="primary" size="md" onClick={() => this.props.history.push(`/admin/riwayat-lembur`)}>
                                                <i className="fas fa-list-ul mr-2"></i>
                                                Riwayat Lembur
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
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
                                                                src={`${process.env.REACT_APP_BASE_URL}backend/api/storage/lembur/${lembur.foto || 'default.jpg'}`}
                                                            />
                                                        </Col>
                                                        <Col className="col-8">
                                                            <CardTitle className="mb-1">
                                                                <Row>
                                                                    <Col lg={6}>
                                                                        <h2>{lembur.name}</h2>
                                                                    </Col>
                                                                    <Col lg={6} className="text-right">
                                                                        <span className="font-weight-bold d-block">{moment(lembur.tanggal).locale('id').format('DD MMMM, Y')}</span>
                                                                        <span className="font-weight-bold">{moment(lembur.lembur_awal, 'HH:mm:ss').format('HH:mm')}</span> - <span className="font-weight-bold">{moment(lembur.lembur_akhir, 'HH:mm:ss').format('HH:mm')}</span>
                                                                    </Col>
                                                                </Row>
                                                            </CardTitle>
                                                            <CardText>
                                                                <span className="font-weight-bold d-block mb-2">Konsumsi :  <span className="font-weight-normal">Rp. {lembur.konsumsi}</span></span>
                                                                <span className="font-weight-bold d-block mt-lg-4">Keterangan : </span>
                                                                <p className="m-0">{lembur.keterangan}</p>
                                                            </CardText>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12} sm={12} className="col-6 col-sm-12 d-flex justify-content-sm-start justify-content-lg-end align-items-center">
                                                    <Button style={{ marginRight: "1rem" }} onClick={() => this.handleClick(lembur.id, 'diterima')} className="w-70 h-70 bg-success text-white">
                                                        <i className="fas fa-check text-white"></i>
                                                    </Button>
                                                    <Button onClick={() => this.handleClick(lembur.id, 'ditolak')} className="w-70 h-70 bg-danger text-white">
                                                        <i className="fas fa-times text-white"></i>
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
export default withRouter(FadeIn(Lembur, Header));