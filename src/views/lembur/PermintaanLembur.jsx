import React from 'react';

import Header from 'components/Headers/Header.jsx';
import API from 'store/api.js';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    CardText,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import moment from 'moment';
import 'moment/locale/id';
import { withRouter, Link } from 'react-router-dom';
import Loading from 'components/ui/Loading.jsx'
import 'assets/css/permintaanLembur.css';
class PermintaanLembur extends React.Component {
    handleClick = (id, status) => {
        API().post(`lembur/${id}`, { status })
            .then(res => {
                document.querySelector(`.card-${id}`).classList.add('card-dissolve');
                this.props.getData();
            })
            .catch(err => console.log(err))
        console.log(id, status)
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
                <Modal size="lg" isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h2 className="m-0">Permintaan Lembur</h2>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.data ? this.props.data.map(lembur => {
                            return (
                                <Card body style={styles.card} className={`permintaan-lembur-card mb-2 card-${lembur.id}`}>
                                    <Row>
                                        <Col lg={12} sm={12} className="col-6 col-sm-12">
                                            <Row>
                                                <Col className="col-4">
                                                    <img
                                                        alt="..."
                                                        height="200"
                                                        style={{ borderRadius: "10px" }}
                                                        src={`http://127.0.0.1:8000/storage/lembur/${lembur.foto || 'default.jpg'}`}
                                                    />
                                                </Col>
                                                <Col className="col-8">
                                                    <CardTitle className="mb-1">
                                                        <Row>
                                                            <Col lg={6}>
                                                                <h2>{lembur.name}</h2>
                                                            </Col>
                                                            <Col lg={6} className="text-right">
                                                                <span className="font-weight-bold d-block">{moment(lembur.tanggal).locale('id').fromNow()}</span>
                                                                <span className="font-weight-bold">{lembur.lembur_awal}</span> - <span className="font-weight-bold">{lembur.lembur_akhir}</span>
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
                                            <Button style={{ marginRight: "1rem" }} onClick={() => this.handleClick(lembur.id, 'diterima')} className="w-70 h-70 bg-success text-white">
                                                <i className="fas fa-check text-white"></i>
                                            </Button>
                                            <Button onClick={() => this.handleClick(lembur.id, 'ditolak')} className="w-70 h-70 bg-danger text-white">
                                                <i className="fas fa-times text-white"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        }) : <div className="d-flex justify-content-center"><Loading /></div>}
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default PermintaanLembur;