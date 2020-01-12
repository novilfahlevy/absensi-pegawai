import React from 'react';

import Header from 'components/Headers/Header.jsx';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardTitle,
  CardBody, 
  CardHeader, 
  Button, 
  ListGroup,
  ListGroupItem
} from 'reactstrap';

class TambahAbsensi extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7">
          <Row>
            <Col md="7">
              <Card className="mb-3">
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h2 className="m-0">Detail Absensi</h2>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="primary" onClick={() => this.props.history.push('absensi')}>
                        <i className="fas fa-arrow-left"></i>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <ListGroup>
                      <ListGroupItem>
                        <h3>Tanggal</h3>
                        <p className="m-0">2019-12-2</p>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h3>Jam Masuk</h3>
                        <p className="m-0">7:50</p>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h3>Jam Pulang</h3>
                        <p className="m-0">16:20</p>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h3>Keterangan Absen</h3>
                        <p className="m-0">
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia soluta voluptatum illo quidem quisquam explicabo consequuntur rerum voluptas quia reprehenderit.
                        </p>
                      </ListGroupItem>
                      <Button color="primary" className="mt-3">Lihat Keterangan Lembur</Button>
                    </ListGroup>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="5">
              <Card>
                <CardBody>
                  <CardTitle><h2 className="m-0">Lokasi</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwZyEkoZk2huhck8SO8b_hShfu6_a3tz7gsDfmzwjjiLS6iFpB" className="rounded" width="100%" height="300" />
                </CardBody>
                <CardBody>
                  <CardTitle><h2 className="m-0">Foto</h2></CardTitle>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtz3bf4yWpyod9EajS3TYr7VknQgyFw1fZhiYL3ZF5AFcvpXAC" className="rounded img-thumbnail" width="100%" height="300" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TambahAbsensi;