import React from 'react';
import Header from 'components/Headers/Header.jsx';
import FadeIn from 'components/hoc/FadeIn.jsx';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

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

import CardsContainer from 'components/ui/CardsContainer.jsx';

class ProjectManager extends React.Component {
  render() {
    const pegawai = [
      { 
        name: 'Novil Fahlevy', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Fullstack Web Developer'
      },
      { 
        name: 'Rizky Maulidan', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Back-end Developer'
      },
      { 
        name: 'Rizky Maulidan', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Back-end Developer'
      },
      { 
        name: 'Rizky Maulidan', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Back-end Developer'
      },
      { 
        name: 'Rizky Maulidan', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Back-end Developer'
      },
      { 
        name: 'Rizky Maulidan', 
        profile: `${process.env.REACT_APP_BASE_URL}storage/profiles/default.jpg`,
        jobdesc: 'Back-end Developer'
      },
    ]

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
                  <Form onSubmit={this.handleCariSubmit}>
                    <InputGroup className="mb-3">
                      <Input onChange={this.handleCariChange} type="search" name="search" id="search"
                        placeholder="Cari anggota" />
                      <InputGroupAddon addonType="append">
                        <Button type="submit" color="primary">Cari</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                  <CardsContainer
                    data={pegawai}
                    card={pegawai => {
                      return (
                        <Card>
                          <Row>
                            <Col className="pr-0">
                              <CardImg src={pegawai.profile} width="80" height="100%" />
                            </Col>
                            <Col className="pl-0">
                              <CardBody>
                                <CardTitle className="mb-2"><h3>{pegawai.name}</h3></CardTitle>
                                <CardText className="text-sm">{pegawai.jobdesc}</CardText>
                                <Button color="primary">
                                  <span className="fas fa-eye"></span>
                                </Button>
                                <Button color="danger">
                                  <span className="fas fa-trash-alt"></span>
                                </Button>
                              </CardBody>
                            </Col>
                          </Row>
                        </Card>
                      );
                    }}
                    filter={{
                      'jobdesc': {
                        options: {
                          'Fullstack Web Developer': 'Fullstack Web Developer',
                          'Back-end Developer': 'Back-end Developer'
                        },
                        placeholder: "Filter Jobdesc"
                      }
                    }}
                    limitOptions={[4, 8, 10]}
                    lg="6"
                  />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(FadeIn(ProjectManager, Header));