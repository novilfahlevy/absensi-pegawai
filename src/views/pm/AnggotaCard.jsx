import React from 'react';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form
} from 'reactstrap';

import FadeIn from 'components/hoc/FadeIn.jsx';
import { withRouter } from 'react-router-dom';

class AnggotaCard extends React.Component {
  render() {
    return (
      <Card>
        <Row>
          <Col className="pr-0">
            <CardImg src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${this.props.member.profile || 'default.jpg'}`} width="80" height="100%" />
          </Col>
          <Col className="pl-0">
            <CardBody>
              <CardTitle className="mb-2"><h3>{this.props.member.name}</h3></CardTitle>
              <CardText className="text-sm">{this.props.member.job}</CardText>
              <Button color="primary" onClick={() => this.props.history.push(`/admin/detail-pegawai/${this.props.member.id}`)}>
                <span className="fas fa-eye"></span>
              </Button>
              <Form className="d-inline-block" onSubmit={e => { e.preventDefault(); this.deleteMember(this.props.member.id); }}>
                <Button type="submit" color="danger">
                  <span className="fas fa-trash-alt"></span>
                </Button>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(FadeIn(AnggotaCard));