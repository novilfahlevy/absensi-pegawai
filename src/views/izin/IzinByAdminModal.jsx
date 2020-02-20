import React from 'react';

import LoadingButton from 'components/ui/LoadingButton.jsx';
import Pagination from 'react-js-pagination';
import api from 'store/api.js';

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CustomInput,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Form
} from 'reactstrap';

class IzinPerjamByAdminModal extends React.Component {
  state = {
    users: [],
    searchUserKeyword: '',
    pagination: {
      start: 0,
      limit: 6,
      activePage: 1
    },
    loading: {
      refreshData: false,
      searchUser: false
    }
  };

  componentWillReceiveProps() {
    if ( !this.props.isOpen ) {
      this.getUsersData();
    }
  }

  setLoading(loading, isLoading) {
    this.setState({ 
      loading: {
        ...this.state.loading,
        [loading]: isLoading
      } 
    });
  };

  getUsersData(callback) {
    api().get('users/to-izin')
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, callback);
        });
      });
  }

  resetPagination() {
    this.setState({
      pagination: {
        ...this.state.pagination,
        start: 0,
        activePage: 1
      }
    });
  }

  searchData = e => {
    e.preventDefault();
    this.setLoading('searchUser', true);
    api().get(`search/users/${this.state.searchUserKeyword}/to-izin`)
      .then(response => {
        this.setState({ users: response.data.data }, () => {
          this.setState({ users: this.state.users }, () => {
            this.resetPagination();
            this.setLoading('searchUser', false);
          });
        });
      });
  }

  refreshData = e => {
    e.preventDefault();
    this.setState({ searchUserKeyword: '' });
    this.setLoading('refreshData', true);
    this.getUsersData(() => {
      this.resetPagination();
      this.setLoading('refreshData', false)
    });
  }

  render() {
    const { start, limit, activePage } = this.state.pagination;
    return (
      <Modal size="lg" {...this.props}>
        <ModalHeader toggle={this.props.toggle}>
          <span className="text-lg">Pilih User</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form onSubmit={this.searchData}>
                <InputGroup>
                  <CustomInput type="search" className="form-control" name="user" id="user" placeholder="Cari nama user" value={this.state.searchUserKeyword} onChange={e => {
                    this.setState({ searchUserKeyword: e.target.value });
                  }} />
                  <InputGroupAddon addonType="append">
                    <LoadingButton type="submit" condition={this.state.loading.searchUser} color="primary" disabled={!this.state.searchUserKeyword}>Cari</LoadingButton>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <Form onSubmit={this.refreshData}>
                <LoadingButton type="submit" className="mt-3" condition={this.state.loading.refreshData} size="sm" color="success">
                  <span className="fas fa-undo mr-2"></span>
                  Muat Ulang Data
                </LoadingButton>
              </Form>
              <hr className="my-3" />
            </Col>
          </Row>
          <Row>
            {this.state.users.length ? this.state.users.slice(start, start + limit).map(user => (
              <Col key={user.id} className="mb-4" lg="6">
                <Card>
                  <CardBody className="p-0 d-flex align-items-center">
                    <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${user.profile || 'default.jpg'}`} width="100" height="70" className="mr-4 rounded" alt="User Absen" />
                    <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                      <CardTitle className="m-0">
                        <p className="m-0">{user.name}</p>
                      </CardTitle>
                      <Button color="success" size="sm" onClick={() => {
                        this.props.setSelectedUser(user);
                        this.props.toggle();
                      }}>Pilih</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )) : (
              <div className="w-100">
                <p className="text-lg text-center">Tidak ada data...</p>  
              </div>
            )}
          </Row>
        </ModalBody>
        <ModalFooter className="mt--4">
          <Pagination
            totalItemsCount={this.state.users.length}
            itemsCountPerPage={this.state.pagination.limit}
            onChange={activePage => {
              const { limit } = this.state.pagination;
              this.setState({ 
                pagination: {
                  ...this.state.pagination,
                  start: (limit * activePage) - limit,
                  activePage 
                }
              });
            }}
            activePage={activePage}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
          />
        </ModalFooter>
      </Modal>
    );
  }
}

export default IzinPerjamByAdminModal;