import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import Swal from 'sweetalert2';
import { TimePicker } from 'antd';
import LoadingButton from './../../components/ui/LoadingButton';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, FormFeedback, ModalFooter, Input, Form, FormGroup, CustomInput, Label } from 'reactstrap';
import AutoSuggest from 'react-autosuggest';
import API from './../../store/api';
import 'antd/dist/antd.css';
import './../../assets/css/auto-suggest.css'
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/id';
import DateTime from 'react-datetime';
const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 1972
    }
]

const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (
    <span className="suggestion-item">{suggestion.name}<br></br><span className="text-muted">{suggestion.email}</span></span>
)
export default class FormLembur extends React.Component {
    state = {
        is_loading: false,
        value: '',
        suggestions: []
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: typeof newValue !== 'undefined' ? newValue : '',
        });
    };
    onSuggestionFetchRequested = ({ value }) => {
        API().get(`user/cari/${value}`)
            .then(res => {
                console.log(res);
                this.setState({ suggestions: res.data.data })
            })
            .catch(err => this.setState({ suggestions: [{ name: 'none found', email: '' }] }))
    }
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
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
        console.log(languages);
    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Ketikkan nama user',
            value,
            onChange: this.onChange
        }
        const AddLemburSchema = Yup.object().shape({
            name: Yup.string()
                .required('Masukan nama pegawai'),
            tanggal: Yup.string()
                .required('Masukan tanggal lembur'),
            waktu_mulai: Yup.string()
                .required('Tentukan waktu mulai lembur'),
            waktu_akhir: Yup.string()
                .required('Tentukan waktu akhir lembur'),
            konsumsi: Yup.string()
                .required('Masukkan jumlah konsumsi'),
        })
        return (
            <>
                <Modal isOpen={this.props.isModalOpen} toggle={this.toggleModal}>
                    <Formik
                        initialValues={{
                            name: '',
                            tanggal: moment(),
                            waktu_mulai: '',
                            waktu_selesai: '',
                            konsumsi: '',
                            keterangan: '',
                            foto: null
                        }}
                        validationSchema={AddLemburSchema}
                        onSubmit={data => {
                            this.setState({ isLoading: true });
                            console.log(data);
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <ModalHeader toggle={this.toggleModal}>
                                    <h2>Form Pegawai</h2>
                                </ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup className="auto-suggest">
                                                <Label for="jobdesc_id">Nama</Label>
                                                <AutoSuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionFetchRequested}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputProps}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" className="mb-4">
                                            <Label className="d-block" for="jobdesc_id">Tanggal</Label>
                                            <DateTime locale="id" dateFormat="YYYY-MM-DD" timeFormat={false} />
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label className="d-block" for="jobdesc_id">Waktu Mulai</Label>
                                                <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label className="d-block" for="jobdesc_id">Waktu Selesai</Label>
                                                <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} />
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
                                    <LoadingButton type="submit" color="primary" condition={this.state.isLoading}>Tambah</LoadingButton>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            </>
        )
    }
}