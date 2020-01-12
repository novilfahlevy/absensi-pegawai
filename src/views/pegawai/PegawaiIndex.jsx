
import React from "react";

// reactstrap components
import {
    Badge,
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
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,

} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../store/api.js';
import PegawaiForm from './PegawaiForm'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
class PegawaiIndex extends React.Component {
    state = {
        pegawai: [],
        modalIsOpen: false,
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
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
        API.get('users')
            .then(res => {
                this.setState({ pegawai: res.data })
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
                                            <DropdownItem onClick={this.deletePegawai} style={{ cursor: 'pointer' }}>
                                                <i className="fas fa-trash-alt text-danger"></i>
                                                Delete
                                            </DropdownItem>
                                            <DropdownItem style={{ cursor: 'pointer' }}>
                                                <i className="fas fa-pencil-alt text-success"></i>
                                                Edit
                                            </DropdownItem>
                                            <DropdownItem onClick={() => this.props.history.push(`/admin/detail-pegawai/${p.id}`)} style={{ cursor: 'pointer' }}>
                                                <i className="fas fa-eye text-primary"></i>
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
    render() {
        const columns = [{
            dataField: 'username',
            text: 'Username'
        }, {
            dataField: 'email',
            text: 'Email'
        }, {
            dataField: 'address.street',
            text: 'Alamat'
        }, {
            dataField: 'actions',
            text: 'Opsi',
            headerStyle: { width: '70px', textAlign: 'center' },
            align: 'center'
        }];
        const { pegawai } = this.state;
        return (
            <>
                <Header />
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
                                            <Button color="primary" href="#pablo" onClick={this.toggleModal} size="md">
                                                Tambah Pegawai
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable keyField="id" data={pegawai} columns={columns}></BootstrapTable>
                                </CardBody>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    3
                        </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    <PegawaiForm modal={this.state.modalIsOpen} toggle={this.toggleModal} />
                </Container>
            </>
        );
    }
}

export default withRouter(PegawaiIndex);
