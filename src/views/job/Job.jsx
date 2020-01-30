import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

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
    newJob: '',
    addJobLoading: false
  };

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
                          <CustomInput type="text" className="form-control" name="job" id="job" placeholder="Nama Job" onChange={this.changeNewJob} />
                        </FormGroup>
                        <LoadingButton type="submit" color="primary" className="w-100" condition={this.state.addJobLoading}>Tambah Job</LoadingButton>
                      </Form>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <ListGroup className="mt-3 mt-lg-0">
                      {this.props.jobs && this.props.jobs.map(job => (
                        <JobListItem job={job} />
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
  })
)(FadeIn(Job, Header));