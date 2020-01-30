import React from 'react';

import {
  Row,
  Col,
  CustomInput,
  ListGroupItem,
  Button
} from 'reactstrap';

class JobListItem extends React.Component {
  render() {
    return (
      <ListGroupItem>
        <Row>
          <Col className="d-flex align-items-center">
            {/* <CustomInput type="text" size="sm" className="form-control" name="job" id="job" placeholder="Edit Job (Tekan Enter)" /> */}
            {this.props.job.name}
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Button color="success" size="sm">
              <span className="fas fa-pencil-alt"></span>
            </Button>
            <Button color="danger" size="sm">
              <span className="fas fa-trash-alt"></span>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default JobListItem;