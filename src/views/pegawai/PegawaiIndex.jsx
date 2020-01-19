
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
    DropdownItem
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
        pegawaiEdited: null
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }
    toggleEditModal = id => {
        this.setState({ pegawaiEdited: id }, () => {
            this.setState({ editModalIsOpen: !this.state.editModalIsOpen });
        });
    }
    getDataPegawai = () => {
        API().get('user')
            .then(res => {
                this.setState({ pegawai: res.data.user })
                this.setState({
                    pegawai: this.state.pegawai.map(p => {
                        return {
                            ...p, actions:
                                <>
                                    <UncontrolledDropdown>
                                        <DropdownToggle size="sm">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem style={{ cursor: 'pointer' }} size="sm" onClick={() => this.toggleEditModal(p.id)}>
                                                <i className="fas fa-pencil-alt text-success"></i>
                                                Edit
                                            </DropdownItem>
                                            <DropdownItem style={{ cursor: 'pointer' }} onClick={() => {
                                                Swal.fire({
                                                    title: 'Apakah anda yakin?',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Hapus',
                                                    cancelButtonText: 'Gak jadi!',
                                                    reverseButton: true
                                                }).then((result) => {
                                                    if (result.value) {
                                                        this.props.hapusPegawai(p.id)
                                                    }
                                                })
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
                        };
                    })
                })
            })
            .catch(err => console.log(err))
    }
    deletePegawai() {
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
                Swal.fire(
                    'Dihapus!',
                    'Data sudah dihapus.',
                    'success'
                )
            }
        })
    }
    componentDidMount() {
        this.getDataPegawai();
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
                                        <Col xs="8">
                                            <h2 className="mb-0">Daftar Pegawai</h2>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button color="primary" onClick={this.toggleModal} size="md">
                                                Tambah Pegawai
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <InputGroup className="mb-3">
                                        <Input type="search" name="search" id="search" placeholder="Cari pegawai" />
                                        <InputGroupAddon addonType="append">
                                            <Button color="primary">Cari</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
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
