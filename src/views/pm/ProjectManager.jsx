import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import CardsContainer from 'components/ui/CardsContainer.jsx';
import user from 'user.js';
import api from 'store/api.js';
import { connect } from 'react-redux';
import LoadingButton from 'components/ui/LoadingButton.jsx';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
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

import AnggotaCard from 'views/pm/AnggotaCard.jsx';

class ProjectManager extends React.Component {
  state = {
    members: [],
    filterJob: 'all',
    filterModalIsOpen: false,
    filterLoading: false,
    deleteMemberLoading: false,
    searchMemberKeyword: '',
    searchLoading: false
  }

  componentDidMount() {
    this.getMembersData();
  }

  getMembersData() {
    api().get(`user/${user('id')}/pm`)
      .then(res => {
        this.setState({ members: res.data.data });
      });
  }

  toggleFilterModal = () => {
    this.setState({ filterModalIsOpen: !this.state.filterModalIsOpen }, () => {
      if ( !this.state.filterModalIsOpen ) {
        this.setState({
          filterJob: 'all'
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
    api().get(`user/pm/filter/member/${user('id')}/${this.state.filterJob}`)
      .then(response => {
        this.setState({ members: response.data.data }, () => {
          this.setState({ filterLoading: false });
          this.toggleFilterModal();
        });
      });
  }

  deleteMember = id => {
    Swal.fire({
      text: "Apakah anda yakin ingin menghapus anggota ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then((result) => {
      if ( result.value ) {
        this.setState({ deleteMemberLoading: true });

        api().delete(`/user/pm/${user('id')}/${id}`)
        .then(response => {
          Swal.fire({
            icon: 'success',
            text: 'Anggota berhasil dihapus!'
          });
          this.setState({ deleteMemberLoading: false });
          this.getMembersData();
        });
      }
    })
  }

  refreshData = () => {
    this.getMembersData();
  }

  searchMember = e => {
    e.preventDefault();
    this.setState({ searchLoading: true });
    api().get(`user/pm/${user('id')}/search/${this.state.searchMemberKeyword}`)
    .then(response => {
      this.setState({ members: response.data.data }, () => {
        this.setState({ searchLoading: false });
      });
    })
  }

  changeMemberSearchKeyword = e => {
    this.setState({ searchMemberKeyword: e.target.value });
  }

  render() {
    return (
      <> 
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                    <h2 className="mb-0">Daftar Anggota Project Manager</h2>
                    </Col>
                    <Col className="text-right" xs="6">
                    <Button color="primary" onClick={() => this.props.history.push('/admin/tambah-anggota')} size="md">
                      Tambah Anggota
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.searchMember}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.changeMemberSearchKeyword} type="search" name="search" id="search"
                        placeholder="Cari anggota" />
                      <InputGroupAddon addonType="append">
                        <LoadingButton type="submit" color="primary" condition={this.state.searchLoading}disabled={!this.state.searchMemberKeyword}>Cari</LoadingButton>
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
                  <CardsContainer
                    data={this.state.members}
                    card={(member, i) => {
                      return (
                        <AnggotaCard member={member} fadeInDelay={(i + 1) * 100} />
                      );
                    }}
                    limitOptions={[4, 8, 10]}
                    lg="6"
                  />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        <Modal isOpen={this.state.filterModalIsOpen}>
          <Form onSubmit={this.submitFilter}>
            <ModalHeader><span className="text-lg">Filter Anggota</span></ModalHeader>
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
    jobs: state.filter.jobs
  })
)(withRouter(FadeIn(ProjectManager, Header)));