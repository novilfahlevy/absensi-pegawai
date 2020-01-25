
import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Pagination,
    PaginationItem,
    PaginationLink,
    Col,
    Container,
    Button,
    Row,
    InputGroup,
    Input,
    InputGroupAddon,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../store/api.js';
import PegawaiForm from './PegawaiForm'
import EditPegawaiForm from './EditPegawaiForm'
import { hapusPegawai } from 'store/actions/pegawaiActions.js';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import Table from 'components/ui/Table.jsx';
import { selectFilter } from 'react-bootstrap-table2-filter';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { connect } from 'react-redux';
class PegawaiIndex extends React.Component {
    state = {
        pegawai: [],
        modalIsOpen: false,
        editModalIsOpen: false,
        pegawaiEdited: null,
        cariPegawaiKeyword: ''
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }
    toggleEditModal = id => {
        this.setState({ pegawaiEdited: id }, () => {
            this.setState({ editModalIsOpen: !this.state.editModalIsOpen });
        });
    }
    getPegawaiOptions(id) {
        return (
            <>
                <UncontrolledDropdown>
                    <DropdownToggle size="sm">
                        <i className="fas fa-ellipsis-v"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem style={{ cursor: 'pointer' }} size="sm" onClick={() => this.toggleEditModal(id)}>
                            <i className="fas fa-pencil-alt text-success"></i>
                            Edit
                        </DropdownItem>
                        <DropdownItem style={{ cursor: 'pointer' }} onClick={() => {
                            this.deletePegawai(id);
                        }}>
                            <i className="fas fa-trash-alt text-danger"></i>
                            Hapus
                        </DropdownItem>
                        <DropdownItem onClick={() => this.props.history.push(`/admin/detail-pegawai/${id}`)} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-list-alt text-primary"></i>
                            Detail
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </>
        )
    }
    getDataPegawai = () => {
        API().get('user')
            .then(res => {
                console.log(res);
                this.setState({ pegawai: res.data.user })
                this.setState({
                    pegawai: this.state.pegawai.map(p => {
                        return {
                            ...p, actions: this.getPegawaiOptions(p.id)
                        };
                    })
                })
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }
    deletePegawai = id => {
        Swal.fire({
            title: 'Apa anda yakin?',
            text: "Data yang sudah dihapus tidak bisa dipulihkan kembali!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Gak jadi!',
            reverseButton: true
        }).then((result) => {
            if (result.value) {
                API().post(`user/destroy/${id}`)
                    .then(res => {
                        Swal.fire(
                            'Dihapus!',
                            'Data sudah dihapus.',
                            'success'
                        )
                        this.getDataPegawai();
                    })
                    .catch(err => {
                        Swal.fire(
                            'Gagal',
                            'Gagal menghapus data.',
                            'error'
                        )
                    })
            }
        })
    }
    handleCariChange = e => {
        this.setState({ cariPegawaiKeyword: e.target.value })
    }
    handleCariSubmit = e => {
        e.preventDefault();
        if (this.state.cariPegawaiKeyword === '') {
            this.getDataPegawai();
        } else {
            API().get(`user/cari/${this.state.cariPegawaiKeyword}`)
                .then(res => {
                    this.setState({ pegawai: res.data.data }, () => {
                        this.setState({
                            pegawai: this.state.pegawai.map(p => {
                                return {
                                    ...p, actions: this.getPegawaiOptions(p.id)
                                };
                            })
                        })
                    });
                })
                .catch(err => console.log(err))
        }


    }
    componentDidMount() {
        this.getDataPegawai();
    }
    clearSearch = () => {
        this.getDataPegawai();
        this.setState({ cariPegawaiKeyword: '' });
    }
    render() {
        const columns = [{
            dataField: 'name',
            text: 'Nama',
            sort: true
        }, {
            dataField: 'email',
            text: 'Email'
        }, {
            dataField: 'actions',
            text: 'Opsi',
            headerStyle: { width: '110px', textAlign: 'center' },
            align: 'center'
        }];
        const { pegawai } = this.state;
        return (
            <>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <Col xs="6">
                                            <h2 className="mb-0">Daftar Pegawai</h2>
                                        </Col>
                                        <Col className="text-right" xs="6">
                                            <Button color="primary" onClick={this.toggleModal} size="md">
                                                Tambah Pegawai
                                            </Button>
                                            <Button color="success" onClick={() => this.props.history.push(`/admin/laporan-pegawai`)} size="md">
                                                Laporan Pegawai
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg="9">
                                            <Form onSubmit={this.handleCariSubmit}>
                                                <InputGroup className="mb-3">
                                                    <Input onChange={this.handleCariChange} type="search" name="search" id="search" placeholder="Cari pegawai" value={this.state.cariPegawaiKeyword} />
                                                    <InputGroupAddon addonType="append">
                                                        <Button type="submit" color="primary">Cari</Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Form>
                                        </Col>
                                        <Col lg="3">
                                            <div className="d-flex justify-content-end w-100">
                                                <Button color="danger" onClick={this.clearSearch}>
                                                    Hapus Pencarian
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Table data={pegawai} columns={columns}></Table>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                    <PegawaiForm modal={this.state.modalIsOpen} toggle={this.toggleModal} getDataPegawai={this.getDataPegawai} />
                    {this.state.editModalIsOpen && (
                        <EditPegawaiForm modal={this.state.editModalIsOpen} toggle={this.toggleEditModal} pegawaiId={this.state.pegawaiEdited} />
                    )}
                </Container>
            </>
        );
    }
}
export default connect(
    null,
    dispatch => ({
        hapusPegawai: id => dispatch(hapusPegawai(id))
    })
)(withRouter(FadeIn(PegawaiIndex, Header)));
