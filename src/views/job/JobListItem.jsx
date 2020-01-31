import React from 'react';
import Swal from 'sweetalert2';
import api from 'store/api.js';
import { connect } from 'react-redux';

import 'assets/css/views/job/joblistitem.css';

import {
  Row,
  Col,
  CustomInput,
  ListGroupItem,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form
} from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';

class JobListItem extends React.Component {
  state = {
    editMode: false,
    newJob: '',
    deleteJobLoading: false,
    editJobLoading: false,
    deleteModalIsOpen: false,
    deleteAllUserWithCurrentJob: false,
    newJobForDeletedUser: 1
  };

  componentDidMount() {
    this.setState({ 
      newJob: this.props.job.name,
      newJobForDeletedUser: this.props.jobs[0] ? this.props.jobs[0].id : null
    });
  }
  
  componentWillReceiveProps() {
    this.setState({ 
      newJob: this.props.job.name,
      newJobForDeletedUser: this.props.jobs[0] ? this.props.jobs[0].id : null
    });  
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  editJob = (id, oldJobName, newJobName) => {
    if ( oldJobName !== newJobName ) {
      this.setState({ editJobLoading: true });
      api().post(`/jobdesc/${this.props.job.id}/edit`, { name: this.state.newJob })
      .then(response => {
        this.props.getJobs(() => {
          this.setState({ editMode: false }, () => this.setState({ 
            editJobLoading: false,
            newJob: newJobName
          }));
        });
      });
    } else this.toggleEditMode();
  }

  changeNewJobName = e => {
    this.setState({ newJob: e.target.value });
  }

  deleteJob = e => {
    e.preventDefault();
    Swal.fire({
      text: this.state.deleteAllUserWithCurrentJob ? `Apakah anda yakin ingin menghapus semua user dengan job ${this.props.job.name}?` : "Yakin ingin hapus job?",
      icon: this.state.deleteAllUserWithCurrentJob ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Hapus'
    }).then(result => {
      if ( result.value ) {
        this.setState({ deleteJobLoading: true });

        const deleteTheJob = () => {
          api().delete(`jobdesc/${this.props.job.id}/destroy`)
          .then(response => {
              Swal.fire(
                '',
                `Job berhasil dihapus.`,
                'success'
              );
              this.setState({ deleteJobLoading: false });
              this.props.getJobs();
          })
        }

        if ( !this.state.deleteAllUserWithCurrentJob ) {
          api().put(`jobdesc/${this.props.job.id}/${this.state.newJobForDeletedUser}`)
          .then(response => deleteTheJob());
          return;
        }

        deleteTheJob();
      }
    })
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModalIsOpen: !this.state.deleteModalIsOpen } , () => {
      this.setState({ deleteAllUserWithCurrentJob: !this.state.deleteModalIsOpen })
    });
  }

  toggleDeleteAllUserWithCurrentJob = e => {
    this.setState({ deleteAllUserWithCurrentJob: e.target.checked });
  }

  changeNewJobForDeletedUser = e => {
    this.setState({ newJobForDeletedUser: e.target.value });
  }

  render() {
    const { id, name } = this.props.job;
    return (
      <>
        <ListGroupItem>
          <Row>
            <Col className="d-flex align-items-center">
              {this.state.editMode ? (
                <CustomInput type="text" size="sm" className="form-control" name="job" id="job" defaultValue={name} placeholder="Edit Job" disabled={this.state.editJobLoading} onChange={this.changeNewJobName} onKeyDown={e => e.key === 'Enter' && this.editJob(id, name, this.state.newJob) } />
              ) : name}
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <Button color="success" size="sm" onClick={e => { 
                this.editJob(id, name, this.state.newJob);
              }} disabled={this.state.editJobLoading}>
                <span className="fas fa-pencil-alt"></span>
              </Button>
              <Button color="danger" size="sm" onClick={this.toggleDeleteModal} disabled={!this.props.jobs.length}>
                <span className="fas fa-trash-alt"></span>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
        <Modal isOpen={this.state.deleteModalIsOpen} toggle={this.toggleDeleteModal}>
          <Form onSubmit={this.deleteJob}>
            <ModalHeader toggle={this.toggleDeleteModal}>
              <p className="m-0 text-lg">Hapus Job</p>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col className="col-12">
                  <p className="m-0">Ganti job semua user yang mempunyai job {this.props.job.name} dengan :</p>
                </Col>
                <Col className="col-12 my-3">
                  <CustomInput type="select" id="newJobForDeletedUser" name="newJobForDeletedUser" onChange={this.changeNewJobForDeletedUser} disabled={this.state.deleteAllUserWithCurrentJob}>
                    {this.props.jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.name}</option>
                    ))}
                  </CustomInput>
                </Col>
                <Col className="col-12">
                  <p className="m-0 mb-3">Atau</p>
                  <CustomInput type="checkbox" id="deleteAllUserWithCurrentJob" name="deleteAllUserWithCurrentJob" label={`Hapus semua user dengan job ${this.props.job.name}.`} onClick={this.toggleDeleteAllUserWithCurrentJob} />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
              <LoadingButton type="submit" color="danger" condition={this.state.deleteJobLoading}>Hapus</LoadingButton>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    jobs: state.filter.jobs.filter(job => job.id !== ownProps.job.id)
  })
)(JobListItem);
