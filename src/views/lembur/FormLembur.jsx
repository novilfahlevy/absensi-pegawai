import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { TimePicker, AutoComplete } from 'antd';
import LoadingButton from './../../components/ui/LoadingButton';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup, CustomInput, Label } from 'reactstrap';
import AutoSuggest from 'react-autosuggest';
import API from './../../store/api';
import 'antd/dist/antd.css';
import './../../assets/css/auto-suggest.css'
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/id';
import DateTime from 'react-datetime';

export default class FormLembur extends React.Component {
    state = {
        is_loading: false,
        dataSource: [],
        data: {
            id: '',
            waktu_mulai: null,
            waktu_selesai: null,
            tanggal: null,
            konsumsi: '',
            keterangan: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ is_loading: true })
        API().post('lembur/byAdmin', this.state.data)
            .then(res => {
                this.setState({ is_loading: false });
                this.props.toggle();
                Swal.fire(
                    'Lembur berhasil ditambahkan!',
                    'Lembur yang ditambahkan akan langsung diterima dan memiliki gambar default!',
                    'success'
                )
            })
            .catch(err => {
                this.setState({ is_loading: false });
                this.props.toggle();
                Swal.fire(
                    'Lembur gagal ditambahkan!',
                    'Pastikan absensi user dengan tanggal yang diinginkan sudah ada!',
                    'error'
                )
            })
    }
    handleDate = date => {
        this.setState({ data: { ...this.state.data, tanggal: date } })
    }
    handleWaktuMulai = time => {
        this.setState({ data: { ...this.state.data, waktu_mulai: time } })
    }
    handleWaktuSelesai = time => {
        this.setState({ data: { ...this.state.data, waktu_selesai: time } })
    }
    handleName = value => {
        this.setState({ data: { ...this.state.data, id: value } })
    }
    handleChange = e => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }
    toggleModal = () => {
        Swal.fire({
            text: 'Batalkan tambah lembur?',
            icon: 'question',
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Batal'
        })
            .then(({ value }) => value && this.props.toggle());
    }
    componentDidMount() {
        API().get('user')
            .then(res => {
                res.data.user.map((data) => {
                    this.setState({
                        dataSource: [...this.state.dataSource, {
                            value: data.id,
                            text: `${data.username} - ${data.email}`
                        }]
                    })
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.isModalOpen} toggle={this.toggleModal}>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggleModal}>
                            <h2>Tambah Lembur</h2>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col sm="12">
                                    <FormGroup className="auto-suggest">
                                        <Label for="jobdesc_id">Nama</Label>
                                        <AutoComplete
                                            dataSource={this.state.dataSource}
                                            filterOption={(inputValue, option) =>
                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onChange={this.handleName}
                                            placeholder="Nama Pegawai..."
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="12" className="mb-4">
                                    <Label className="d-block" for="jobdesc_id">Tanggal</Label>
                                    <DateTime onChange={this.handleDate} locale="id" dateFormat="YYYY-MM-DD" timeFormat={false} />
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label className="d-block" for="jobdesc_id">Waktu Mulai</Label>
                                        <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss').locale('id')} value={this.state.data.waktu_mulai} onChange={this.handleWaktuMulai} format={'HH:mm'} />
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label className="d-block" for="jobdesc_id">Waktu Selesai</Label>
                                        <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss').locale('id')} value={this.state.data.waktu_selesai} onChange={this.handleWaktuSelesai} format={'HH:mm'} />
                                    </FormGroup>
                                </Col>
                                <Col sm="12">
                                    <FormGroup>
                                        <Label for="konsumsi">Konsumsi</Label>
                                        <Input onChange={this.handleChange} name="konsumsi" type="number" className="form-control-alternative" id="Konsumsi" placeholder="Jumlah Konsumsi" />
                                    </FormGroup>
                                </Col>
                                <Col sm="12">
                                    <FormGroup>
                                        <Label for="keterangan">Keterangan</Label>
                                        <Input onChange={this.handleChange} name="keterangan" type="textarea" className="form-control-alternative" id="Keterangan" placeholder="Ketarangan Lembur" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                            <LoadingButton type="submit" color="primary" condition={this.state.is_loading}>Tambah</LoadingButton>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        )
    }
}