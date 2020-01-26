import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import { selectFilter } from 'react-bootstrap-table2-filter';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  CustomInput
} from 'reactstrap';

import Table from 'components/ui/Table.jsx';

class TambahAnggota extends React.Component {
  state = {
    selectedMembers: [1],
    filterModalIsOpen: false
  };

  // id: 1,
  // name: 'Novil Fahlevy', 
  // email: 'novilfreon@gmail.com', 
  // jobdesc: 'Fullstack Web Developer',
  // detail: (
  //   <Button color="primary" size="sm">
  //     <span className="fas fa-eye"></span>
  //   </Button>
  // ),
  // tambah: (
  //   <Button color='danger' size="sm">
  //     <span className='fas fa-minus'></span>
  //   </Button>
  // )

  componentDidMount() {
    this.setState({ pegawai: this.state.realData }, () => {
      this.setState({ pegawai: this.state.pegawai });
    });
  }

  toggleSelectMember = user_id => {
    if ( !this.isMemberSelected(user_id) ) {
      this.setState({ selectedMembers: [...this.state.selectedMembers, user_id] });
      return;
    }
    this.setState({ 
      selectedMembers: this.state.selectedMembers.filter(id => id !== user_id)
    });
  }

  isMemberSelected = user_id => {
    return this.state.selectedMembers.find(id => id === user_id);
  }

  addMember() {
    // console.log(this.state.selectedMembers);
  }

  toggleFilterModal() {
    this.setState({ filterModalIsOpen: !this.state.filterModalIsOpen });
  }

  render() {
    const columns = [
      {
        dataField: 'name',
        text: 'Nama',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        sort: true
      }, 
      {
        dataField: 'email',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        text: 'Email'
      }, 
      {
        dataField: 'job',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        text: 'Job'
      }, 
      {
        dataField: 'detail',
        text: 'Detail',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        align: 'center'
      },
      {
        dataField: 'tambah',
        text: 'Tambah',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        align: 'center'
      },
    ];

    return (
      <> 
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                    <h2 className="mb-0">Tambah Anggota Project</h2>
                    </Col>
                    <Col className="text-right" xs="6">
                    <Button color="primary" onClick={() => this.props.history.goBack()}>
                      <i className="fas fa-arrow-left"></i>
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleCariSubmit}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.handleCariChange} type="search" name="search" id="search"
                        placeholder="Cari pegawai" />
                      <InputGroupAddon addonType="append">
                        <Button type="submit" color="primary">Cari</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                  <Row>
                    <Col>
                      <div className="d-flex justify-content-between">
                        <div>
                          <Button color="primary" size="sm" onClick={() => this.toggleFilterModal()}>
                            <span className="fas fa-filter mr-1"></span>
                            Filter
                          </Button>
                          <Button color="success" size="sm">
                            <span className="fas fa-undo mr-1"></span>
                            Muat Ulang Data
                          </Button>
                        </div>
                        <Button color="primary" size="sm" className="mb-3" onClick={() => this.addMember()}>Tambah {this.state.selectedMembers.length} Anggota</Button>
                      </div>
                    </Col>
                  </Row>
                  <Table data={this.state.pegawai} columns={columns}></Table>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        <Modal isOpen={this.state.filterModalIsOpen}>
          <ModalHeader><span className="text-lg">Filter Pegawai</span></ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="jobdesc">Job</Label>
                  <CustomInput type="select" id="jobdesc" name="jobdesc">
                    <option value="all">Pilih Semua</option>
                    <option value="Fullstack Web Developer">Fullstack Web Developer</option>
                    <option value="Back-end Developer">Back-end Developer</option>
                  </CustomInput>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.toggleFilterModal()}>Cancel</Button>
            <Button color="primary" onClick={this.submitFilter}>
              <span className="fas fa-filter mr-2"></span>
              Filter
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default FadeIn(TambahAnggota, Header);