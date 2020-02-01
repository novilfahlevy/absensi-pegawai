import React from 'react';
import API from '../../store/api.js';
import Swal from 'sweetalert2'
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl
} from 'reactstrap';

import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import "./../../assets/css/jamKerja.css"
class JamKerja extends React.Component {
    state = {
        hari_kerja: [],
        hours: [...Array(24).keys()].map(i => i + 1),
        days: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
        activeIndex: 0,
        jam_kerja: 0,
        animating: false
    }
    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.hours.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.hours.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    handleClick = day => {
        let hari_kerja = []
        if (this.state.hari_kerja.includes(day)) {
            hari_kerja = this.state.hari_kerja.filter(kerja => {
                return kerja !== day
            });
        } else { hari_kerja = [...this.state.hari_kerja, day]; }
        this.setState({ hari_kerja: hari_kerja })
    }
    handleSubmit = () => {
        const jam_kerja = document.querySelector(".carousel-item.active h1").innerHTML;
        const data = {
            waktu_kerja: jam_kerja,
            hari_kerja: this.state.hari_kerja.join(', ')
        }
        API().post('/admin/waktuKerja', data)
            .then(res => {
                Swal.fire(
                    'Berhasil!',
                    'Jam kerja telah diganti!',
                    'success'
                );
                this.getData()
            })
            .catch(err => {
                console.log(err)
                Swal.fire(
                    'Gagal!',
                    'Jam kerja gagal diganti!',
                    'error'
                );
            })
    }
    getData = () => {
        API().get('/admin/waktuKerja')
            .then(res => {

                this.setState({ hari_kerja: res.data.data[0].hari_kerja.split(", "), jam_kerja: res.data.data[0].waktu_kerja }, () => {
                    this.setState({ activeIndex: this.state.hours.indexOf(this.state.jam_kerja) });
                });
            })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const { hari_kerja, days, hours, activeIndex } = this.state;
        const slides = hours.map((item) => {
            return (
                <CarouselItem onExiting={() => this.setState({ animating: true })}
                    onExited={() => this.setState({ animating: false })}
                    key={item}>
                    <Card body id={item}>
                        <h1>{item}</h1>
                    </Card>
                </CarouselItem>
            );
        });
        return (
            <>
                <Container className="mt--7">
                    <Row>
                        <Col lg="12" className="col-12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col lg={6} className="col-12">
                                            <Row>
                                                <Col className="col-12">
                                                    <CardTitle>
                                                        <h2>Waktu Kerja</h2>
                                                    </CardTitle>
                                                    <Carousel activeIndex={hours.indexOf(hours[activeIndex])} next={this.next} interval={false} previous={this.previous}>
                                                        {slides}
                                                        <CarouselControl style={{ backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E"` }} direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                                    </Carousel>
                                                    <h1 className="text-center display-4 font-weight-bold">Jam</h1>
                                                </Col>
                                                <Col lg={12} className="col-12 d-flex justify-content-center mt-4">
                                                    <Button color="success" type="button" onClick={this.handleSubmit}>Simpan Perubahan</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} className="col-12">
                                            <CardTitle><h2>Hari Kerja</h2></CardTitle>
                                            {days.map(day => {
                                                return (
                                                    <Button id={day} onClick={() => this.handleClick(day)} value={day} className={`w-100 ${hari_kerja.includes(day) && 'jam-kerja-btn-active'} jam-kerja-btn  text-center d-flex justify-content-center mb-3`} style={{ height: '3rem' }}>
                                                        <h3>{day}</h3>
                                                    </Button>
                                                )
                                            })}
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

export default FadeIn(JamKerja, Header);