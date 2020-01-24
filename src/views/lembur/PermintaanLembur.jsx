import React from 'react';

import Header from 'components/Headers/Header.jsx';

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

class PermintaanLembur extends React.Component {
    render() {
        let styles = {
            card: {
                border: "none",
                boxShadow: "-6px -6px 20px rgba(255, 255, 255, 1), 6px 6px 20px rgba(0, 0, 0, .1)",
            }
        }
        return (
            <>
                <Modal size="lg" isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h2 className="m-0">Permintaan Lembur</h2>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.data.map(lembur => {
                            return (
                                <Card body style={styles.card} className="mb-2">
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
                                                    <CardTitle className="mb-2">
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
                            )
                        })}
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default PermintaanLembur;