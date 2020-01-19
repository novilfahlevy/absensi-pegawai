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
        hari_kerja: ["Senin"],
        days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    }
    handleClick = e => {
        let hari_kerja = []
        const element = document.getElementById(e.target.id)
        if (this.state.hari_kerja.includes(e.target.value)) {
            element.classList.remove('jam-kerja-btn-active')
            hari_kerja = this.state.hari_kerja.filter(kerja => {
                return kerja !== e.target.value
            });
        } else {
            element.classList.add('jam-kerja-btn-active')
            hari_kerja = [...this.state.hari_kerja, e.target.value];
        }
        this.setState({
            hari_kerja: hari_kerja
        }, () => console.log(this.state.hari_kerja))

    }
    render() {
        const { hari_kerja, days } = this.state;
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
                                            {days.map(day => {
                                                return (
                                                    <Button id={day} onClick={this.handleClick} value={day} className={`w-100 ${hari_kerja.includes(day) && 'jam-kerja-btn-active'} jam-kerja-btn  text-center d-flex justify-content-center mb-3`} style={{ height: '3rem' }}>
                                                        <h3>{day}</h3>
                                                    </Button>
                                                )
                                            })}
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