import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import api from 'store/api.js';
import { storeJobs } from 'store/actions/filterActions.js';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  CustomInput,
  ListGroup
} from 'reactstrap';
import LoadingButton from 'components/ui/LoadingButton.jsx';
import JobListItem from 'views/job/JobListItem.jsx';

class Job extends React.Component {
  state = {
    jobs: [],
    newJob: '',
    addJobLoading: false
  };

  componentDidMount() {
    this.getJobs();
  }

  getJobs = callback => {
    api().get('/jobdesc').then(res => {
      setTimeout(() => this.setState({ jobs: res.data.data }, callback), 0);
      this.props.storeJobs(res.data.data);
    });
  }

  addJob = e => {
    e.preventDefault();
    if ( !this.state.newJob.length ) {
      Swal.fire(
        'Isi Nama Job',
        'Nama job tidak boleh kosong!',
        'warning'
      );
      return;
    }

    this.setState({ addJobLoading: true });
    api().post('jobdesc/store', { name: this.state.newJob })
      .then(response => {
        Swal.fire(
          '',
          response.data.message,
          response.data.status === 200 ? 'success' : 'error'
        );
        this.setState({ addJobLoading: false });
        this.setState({ newJob: '' });
        this.getJobs();
      });
  }

  changeNewJob = e => {
    this.setState({ newJob: e.target.value });
  }

  render() {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader><h2>Job</h2></CardHeader>
              <CardBody>
                <Row>
                  <Col lg="6">
                    <Card body>
                      <CardTitle>
                        <p className="text-lg m-0">Tambah Job</p>
                      </CardTitle>
                      <Form onSubmit={this.addJob}>
                        <FormGroup>
                          <CustomInput type="text" className="form-control" name="job" id="job" placeholder="Nama Job" value={this.state.newJob} onChange={this.changeNewJob} autoComplete="off" />
                        </FormGroup>
                        <LoadingButton type="submit" color="primary" className="w-100" condition={this.state.addJobLoading}>Tambah Job</LoadingButton>
                        <p className="m-0 mt-3 text-sm">Minimal harus ada 1 job.</p>
                      </Form>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <ListGroup className="mt-3 mt-lg-0">
                      {this.state.jobs && this.state.jobs.map(job => (
                        <JobListItem key={job.id} job={job} getJobs={this.getJobs} />
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(
  state => ({
    jobs: state.filter.jobs
  }),
  dispatch => ({
    storeJobs: jobs => dispatch(storeJobs(jobs))
  })
)(FadeIn(Job, Header));