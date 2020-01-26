import React from 'react';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem, Badge, CardText
} from 'reactstrap';
import Loading from 'components/ui/Loading.jsx';
import API from 'store/api.js';
import moment from 'moment';
import 'moment/locale/id'
class DetailLembur extends React.Component {
    state = {
        data: null
    }

    componentDidMount() {
        API().get(`lembur/${this.props.match.params.id}/detail`)
            .then(res => { this.setState({ data: res.data.data.detail_lembur }); console.log(this.state) }).catch(err => console.log(err))
    }
    render() {
        const { data } = this.state;
        return (
            <>
                <Container className="mt--7">
                    <Row>
                        <Col>
                            <Card className="mb-3">
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="6">
                                            <h2 className="m-0">Detail Lembur</h2>
                                        </Col>
                                        <Col className="text-right" xs="6">
                                            <Button color="success" disabled={data == null ? true : false} className="mr-2" onClick={() => this.props.history.goBack()}>
                                                <i className="fas fa-search mr-2"></i>
                                                Cek Absensi
                                            </Button>
                                            <Button color="primary" onClick={() => this.props.history.goBack()}>
                                                <i className="fas fa-arrow-left"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {data == null ? <div className="d-flex justify-content-center"><Loading /></div> : <Row>
                                        <Col className="col-4">
                                            <img
                                                alt="..."
                                                style={{ borderRadius: "10px", height: "20rem", width: "20rem", backgroundSize: "cover" }}
                                                src={`http://127.0.0.1:8000/storage/lembur/lembur.jpg`}
                                            />
                                        </Col>
                                        <Col className="col-8">
                                            <Row>
                                                <Col className="col-6">
                                                    <h2><Badge className="d-inline-block" color={data.status === 'diterima' ? 'success' : 'danger'}>{data.status === 'diterima' ? 'DITERIMA' : 'DITOLAK'}</Badge></h2>
                                                </Col>
                                                <Col className="col-6 d-flex justify-content-end">
                                                    <span className="font-weight-bold d-block">{moment(data.tanggal).locale('id').fromNow()}</span>
                                                </Col>
                                            </Row>
                                            <CardText>
                                                <span className="font-weight-bold d-block mt-2">Keterangan : </span>
                                                <p className="m-0">{data.keterangan}</p>
                                                <div className="mt-2">
                                                    <span className="font-weight-bold">Konsumsi : </span><span>Rp {data.konsumsi}</span>
                                                </div>
                                            </CardText>

                                            <Card body>
                                                <Row noGutters>
                                                    <Col className="col-3 d-flex justify-content-center">
                                                        <img
                                                            alt="..."
                                                            height="100"
                                                            width="100"
                                                            className="rounded-circle"
                                                            style={{ backgroundSize: "cover" }}
                                                            src={`http://127.0.0.1:8000/storage/lembur/lembur.jpg`}
                                                        />
                                                    </Col>
                                                    <Col className="col-6 d-flex justify-content-start">
                                                        <h1>{data.user.name}</h1>
                                                    </Col>
                                                </Row>
                                            </Card>

                                        </Col>
                                    </Row>}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default withRouter(FadeIn(DetailLembur, Header));