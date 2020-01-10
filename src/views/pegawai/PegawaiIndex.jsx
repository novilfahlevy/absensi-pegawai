
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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import PegawaiForm from './PegawaiForm'
class PegawaiIndex extends React.Component {
    state = {
        pegawai: [],
        modalIsOpen: false,
    }
    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({ pegawai: res.data })
                this.setState({
                    pegawai: this.state.pegawai.map(p => {
                        return {
                            ...p, actions:
                                <>
                                    <Button color="danger">
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                    <Button color="success">
                                        <i className="fas fa-pencil-alt"></i>
                                    </Button>
                                    <Button color="primary">
                                        <i className="fas fa-eye"></i>
                                    </Button>
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
            dataField: 'phone',
            text: 'Phone Number'
        }, {
            dataField: 'actions',
            text: 'Actions'
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

export default PegawaiIndex;
