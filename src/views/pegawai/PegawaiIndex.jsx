
import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
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
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    CustomInput,
    ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import API from '../../store/api.js';
import PegawaiForm from './PegawaiForm'
import EditPegawaiForm from './EditPegawaiForm'
import { hapusPegawai } from 'store/actions/pegawaiActions.js';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import Table from 'components/ui/Table.jsx';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { connect } from 'react-redux';
class PegawaiIndex extends React.Component {
    state = {
        pegawai: [],
        modalIsOpen: false,
        editModalIsOpen: false,
        pegawaiEdited: null,
        cariPegawaiKeyword: '',
        filterModalIsOpen: false,
        filterJob: 'all',
        filterRole: 'all',
        filterLoading: false
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }
    toggleEditModal = id => {
        this.setState({ pegawaiEdited: id }, () => {
            this.setState({ editModalIsOpen: !this.state.editModalIsOpen });
        });
    }
    toggleFilterModal = () => {
        this.setState({ filterModalIsOpen: !this.state.filterModalIsOpen }, () => {
            if ( !this.state.filterModalIsOpen ) {
                this.setState({
                    filterJob: 'all',
                    filterRole: 'all'
                });
            }
        });
    }
    changeFilter = e => {
        let filter = e.target.id;
        filter = `filter${filter[0].toUpperCase() + filter.slice(1)}`;
        this.setState({ [filter]: e.target.value });
    }
    submitFilter = e => {
        e.preventDefault();
        this.setState({ filterLoading: true });
        API().get(`user/filter/${this.state.filterJob}/${this.state.filterRole}`)
        .then(res => {
            this.setState({ pegawai: res.data.data || [] }, () => {
                this.setState({
                    pegawai: this.state.pegawai.length ? this.state.pegawai.map(p => {
                        return {
                            ...p, actions: this.getPegawaiOptions(p)
                        };
                    }) : []
                }, () => { 
                    this.setState({ filterLoading: false });
                    this.toggleFilterModal();
                })
            });
        });
    }
    getPegawaiOptions(p) {
        return (
            <>
                <UncontrolledDropdown>
                    <DropdownToggle size="sm">
                        <i className="fas fa-ellipsis-v"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem style={{ cursor: 'pointer' }} size="sm" disabled={p.role[0] === 'Admin'} onClick={() => this.toggleEditModal(p.id)}>
                            <i className="fas fa-pencil-alt text-success"></i>
                            Edit
                        </DropdownItem>
                        <DropdownItem style={{ cursor: 'pointer' }} disabled={p.role[0] === 'Admin'} onClick={() => {
                            this.deletePegawai(p.id);
                        }}>
                            <i className="fas fa-trash-alt text-danger"></i>
                            Hapus
                        </DropdownItem>
                        <DropdownItem onClick={() => this.props.history.push(`/admin/detail-pegawai/${p.id}`)} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-list-alt text-primary"></i>
                            Detail
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </>
        )
    }
    getDataPegawai = (url = 'user') => {
        API().get('user')
            .then(res => {
                this.setState({ pegawai: res.data.user || [] });
                this.setState({
                    pegawai: this.state.pegawai.length ? this.state.pegawai.map(p => {
                        return {
                            ...p, actions: this.getPegawaiOptions(p)
                        };
                    }) : []
                })
            });
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
                    this.setState({ pegawai: res.data.data || [] }, () => {
                        this.setState({
                            pegawai: this.state.pegawai.map(p => {
                                return {
                                    ...p, actions: this.getPegawaiOptions(p)
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
    refreshData = () => {
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
            dataField: 'job',
            text: 'Job'
        }, {
            dataField: 'role',
            text: 'Role'
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
                                    <Form onSubmit={this.handleCariSubmit}>
                                        <InputGroup className="mb-3">
                                            <Input onChange={this.handleCariChange} type="search" name="search" id="search" placeholder="Cari pegawai" value={this.state.cariPegawaiKeyword} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="submit" color="primary">Cari</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Button color="primary" size="sm" onClick={this.toggleFilterModal}>
                                                <span className="fas fa-filter mr-1"></span>
                                                Filter
                                            </Button>
                                            <Button color="success" size="sm" onClick={this.refreshData}>
                                                <span className="fas fa-undo mr-1"></span>
                                                Muat Ulang Data
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Table data={pegawai} columns={columns}></Table>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                    <PegawaiForm modal={this.state.modalIsOpen} toggle={this.toggleModal} getDataPegawai={this.getDataPegawai} />
                    {this.state.editModalIsOpen && (
                        <EditPegawaiForm modal={this.state.editModalIsOpen} toggle={this.toggleEditModal} pegawaiId={this.state.pegawaiEdited} getDataPegawai={this.getDataPegawai} />
                    )}
                </Container>
                <Modal isOpen={this.state.filterModalIsOpen}>
                    <Form onSubmit={this.submitFilter}>
                        <ModalHeader><span className="text-lg">Filter Pegawai</span></ModalHeader>
                        <ModalBody>
                            <p className="text-md">Berdasarkan :</p>
                                <Row>
                                    <Col className="col-12">
                                        <FormGroup>
                                            <Label for="job">Job</Label>
                                            <CustomInput type="select" id="job" name="job" onChange={this.changeFilter}>
                                                <option value="all">Pilih Semua</option>
                                                {this.props.jobs.length && this.props.jobs.map((job, i) => {
                                                    return <option key={i} value={job.name}>{job.name}</option>
                                                })}
                                            </CustomInput>
                                        </FormGroup>
                                    </Col>
                                    <Col className="col-12">
                                        <FormGroup>
                                            <Label for="role">Role</Label>
                                            <CustomInput type="select" id="role" name="role" onChange={this.changeFilter}>
                                                <option value="all">Pilih Semua</option>
                                                {this.props.roles.length && this.props.roles.map((role, i) => {
                                                    return <option key={i} value={role.name}>{role.name}</option>
                                                })}
                                            </CustomInput>
                                        </FormGroup>
                                    </Col>
                                </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.toggleFilterModal}>Cancel</Button>
                            <LoadingButton type="submit" color="primary" condition={this.state.filterLoading}>
                                <span className="fas fa-filter mr-2"></span>
                                Filter
                            </LoadingButton>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    }
}
export default connect(
    state => ({
        jobs: state.filter.jobs,
        roles: state.filter.roles
    }),
    dispatch => ({
        hapusPegawai: id => dispatch(hapusPegawai(id))
    })
)(withRouter(FadeIn(PegawaiIndex, Header)));
