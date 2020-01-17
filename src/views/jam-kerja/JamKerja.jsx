import React from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    FormGroup,
    Label,
    CustomInput,
    Input,
    Button
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';
import "./../../assets/css/jamKerja.css"
class JamKerja extends React.Component {
    state = {
        jam_kerja: [],
    }
    handleClick = e => {
        let jam_kerja = []
        const element = document.getElementById(e.target.id)
        element.classList.toggle('jam-kerja-btn-active')
        if (this.state.jam_kerja.includes(e.target.value)) {
            jam_kerja = this.state.jam_kerja.filter(kerja => {
                return kerja !== e.target.value
            });
        } else {
            jam_kerja = [...this.state.jam_kerja, e.target.value];
        }
        this.setState({
            jam_kerja: jam_kerja
        }, () => console.log(this.state.jam_kerja))

    }
    render() {
        return (
            <>
                <Header />
                <Container className="mt--7">
                    <Row>
                        <Col lg="12" className="col-12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col lg={6} className="col-12">
                                            <CardTitle><h2>Waktu Kerja</h2></CardTitle>
                                            <FormGroup>
                                                <Input type="number" name="waktu_kerja_datang" id="waktu_kerja_datang" />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} className="col-12">
                                            <CardTitle><h2>Hari Kerja</h2></CardTitle>
                                            <Button id="senin" onClick={this.handleClick} value="Senin" className="w-100 jam-kerja-btn text-center d-flex justify-content-center mb-3" style={{ height: '3rem' }}>
                                                <h3>Senin</h3>
                                            </Button>
                                            <Button id="selasa" onClick={this.handleClick} value="Selasa" className="w-100 jam-kerja-btn text-center d-flex justify-content-center mb-3" style={{ height: '3rem' }}>
                                                <h3>Selasa</h3>
                                            </Button>
                                        </Col>
                                        <Col lg={12} className="col-12">
                                            <Button color="primary" >Atur jam Kerja</Button>
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

export default JamKerja;