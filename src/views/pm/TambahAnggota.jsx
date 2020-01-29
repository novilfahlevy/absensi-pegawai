import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import Swal from 'sweetalert2';
import api from 'store/api.js';
import user from 'user.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    selectedMembers: [],
    pegawai: [],
    filterModalIsOpen: false,
    filterJob: 'all',
    filterLoading: false,
    searchPegawaiKeyword: '',
    searchPegawaiLoading: false
  };

  componentDidMount() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    api().get('user/pm')
    .then(response => {
      this.setState({ pegawai: response.data.data }, () => {
        this.setState({ 
          pegawai: this.state.pegawai.map(pegawai => this.getData(pegawai))
        });
      });
    });
  }

  getData(pegawai) {
    return {
      ...pegawai,
      detail: (
        <Button color="primary" size="sm" onClick={() => this.props.history.push(`/admin/detail-pegawai/${pegawai.id}`)}>
          <span className="fas fa-eye"></span>
        </Button>
      ),
      tambah: (
        <Button color={this.isMemberSelected(pegawai.id) ? 'danger' : 'success'} size="sm" onClick={() => {
          this.toggleSelectMember(pegawai.id)
        }}>
          <span className={`fas fa-${this.isMemberSelected(pegawai.id) ? 'minus' : 'plus'}`}></span>
        </Button>
      )
    }
  }

  toggleSelectMember = user_id => {
    let getData = () => {
      this.setState({ 
        pegawai: this.state.pegawai.map(pegawai => this.getData(pegawai))
      });
    }

    if ( !this.isMemberSelected(user_id) ) {
      this.setState({ selectedMembers: [...this.state.selectedMembers, user_id] }, getData);
      return;
    }
    this.setState({ 
      selectedMembers: this.state.selectedMembers.filter(id => id !== user_id)
    }, getData);
  }

  isMemberSelected = user_id => {
    return this.state.selectedMembers.includes(user_id);
  }

  addMember() {
    if ( this.state.selectedMembers.length ) {
      Swal.fire({
        text: "Tambah anggota?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Iya'
      }).then((result) => {
        if ( result.value ) {
          this.setState({ addMemberLoading: true });
          api().post('user/pm', {
            users: JSON.stringify(this.state.selectedMembers),
            pm: user('id')
          })
          .then(response => {
            Swal.fire({
              icon: 'success',
              text: 'Anggota berhasil ditambah!'
            })
            .then(() => this.props.history.push('/admin/project-manager'));
            // this.setState({ selectedMembers: [] });
            // this.getDataFromApi();
          })
        }
      })
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Tambah minimal 1 anggota!'
      });
    }
  }

  toggleFilterModal() {
    this.setState({ filterModalIsOpen: !this.state.filterModalIsOpen });
  }

  changeFilter = e => {
    let filter = e.target.id;
    filter = `filter${filter[0].toUpperCase() + filter.slice(1)}`;
    this.setState({ [filter]: e.target.value });
  }

  submitFilter = e => {
    e.preventDefault();
    this.setState({ filterLoading: true });
    api().get(`user/pm/filter/pegawai/${Number(this.state.filterJob)}`)
    .then(response => {
      this.setState({ pegawai: response.data.data }, () => {
        this.setState({ pegawai: this.state.pegawai.map(pegawai => this.getData(pegawai)) }, () => {
          this.setState({ filterLoading: false });
          this.toggleFilterModal();
        })
      });
    });
  }

  refreshData = () => {
    this.getDataFromApi();
    this.setState({ selectedMembers: [] });
  }

  searchPegawai = e => {
    e.preventDefault();
    this.setState({ searchPegawaiLoading: true });
    api().get(`user/pm/search/${this.state.searchPegawaiKeyword}`)
    .then(response => {
      this.setState({ pegawai: response.data.data }, () => {
        this.setState({ pegawai: this.state.pegawai.map(pegawai => this.getData(pegawai)) }, () => {
          this.setState({ searchPegawaiLoading: false });
        });
      });
    })
  }

  changeSearchPegawaiKeyword = e => {
    this.setState({ searchPegawaiKeyword: e.target.value });
  }

  render() {
    const columns = [
      {
        dataField: 'name',
        text: 'Nama',
        headerClasses: 'align-middle',
        headerAlign: 'center',
        align: 'center',
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
        text: 'Job',
        align: 'center'
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
                  <Form onSubmit={this.searchPegawai}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.changeSearchPegawaiKeyword} type="search" name="search" id="search"
                        placeholder="Cari pegawai" />
                      <InputGroupAddon addonType="append">
                        <LoadingButton type="submit" color="primary" condition={this.state.searchPegawaiLoading} disabled={!this.state.searchPegawaiKeyword}>Cari</LoadingButton>
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
                          <Button color="success" size="sm" onClick={this.refreshData}>
                            <span className="fas fa-undo mr-1"></span>
                            Muat Ulang Data
                          </Button>
                        </div>
                        <Form className="d-inline-block" onSubmit={e => { e.preventDefault(); this.addMember(); }}>
                          <Button color="primary" size="sm" className="mb-3">Tambah {this.state.selectedMembers.length} Anggota</Button>
                        </Form>
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
          <Form onSubmit={this.submitFilter}>
            <ModalHeader><span className="text-lg">Filter Pegawai</span></ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="jobdesc">Job</Label>
                    <CustomInput type="select" id="job" name="job" onChange={this.changeFilter}>
                      <option value="all">Pilih Semua</option>
                      {this.props.jobs && this.props.jobs.map((job, i) => (
                        <option key={i} value={job.id}>{job.name}</option>
                      ))}
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.toggleFilterModal()}>Cancel</Button>
              <LoadingButton type="submit" condition={this.state.filterLoading} color="primary">
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
    jobs: state.filter.jobs
  })
)(withRouter(FadeIn(TambahAnggota, Header)));