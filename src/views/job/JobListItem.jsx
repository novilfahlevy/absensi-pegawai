import React from 'react';
import Swal from 'sweetalert2';

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
    newJob: ''
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
    this.toggleEditMode();
    if ( oldJobName !== newJobName ) {
      alert('Ter Edit.');
      this.props.getJobs();
    }
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
            }}>
              <span className="fas fa-pencil-alt"></span>
            </Button>
            <Button color="danger" size="sm" onClick={() => this.deleteJob(id)}>
              <span className="fas fa-trash-alt"></span>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default JobListItem;