import React from 'react';
import Swal from 'sweetalert2';
import api from 'store/api.js';

import {
  Row,
  Col,
  CustomInput,
  ListGroupItem,
  Button
} from 'reactstrap';

class JobListItem extends React.Component {
  state = {
    editMode: false,
    newJob: '',
    deleteJobLoading: false,
    editJobLoading: false
  };

  componentDidMount() {
    this.setState({ newJob: this.props.job.name });
  }
  
  componentWillReceiveProps() {
    this.setState({ newJob: this.props.job.name });   
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  editJob = (id, oldJobName, newJobName) => {
    if ( oldJobName !== newJobName ) {
      this.setState({ editJobLoading: true });
      api().post(`/jobdesc/${this.props.job.id}/edit`, { name: this.state.newJob })
      .then(response => {
        this.setState({ editJobLoading: false });
        this.props.getJobs(() => this.setState({ editMode: false }));
      });
    } else this.toggleEditMode();
  }

  changeNewJobName = e => {
    this.setState({ newJob: e.target.value });
  }

  deleteJob = id => {
    Swal.fire({
      text: "Yakin ingin hapus job?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then(result => {
      if ( result.value ) {
        this.setState({ deleteJobLoading: true });

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
    })
  }

  render() {
    const { id, name } = this.props.job;
    return (
      <ListGroupItem>
        <Row>
          <Col className="d-flex align-items-center">
            {this.state.editMode ? (
              <CustomInput type="text" size="sm" className="form-control" name="job" id="job" defaultValue={name} placeholder="Edit Job" onChange={this.changeNewJobName} />
            ) : name}
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Button color="success" size="sm" onClick={e => { 
              this.editJob(id, name, this.state.newJob); 
            }} disabled={this.state.editJobLoading}>
              <span className="fas fa-pencil-alt"></span>
            </Button>
            <Button color="danger" size="sm" onClick={() => this.deleteJob(id)} disabled={this.state.deleteJobLoading}>
              <span className="fas fa-trash-alt"></span>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default JobListItem;