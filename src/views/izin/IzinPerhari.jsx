import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';

import FadeIn from 'components/hoc/FadeIn.jsx';
import CardsContainer from 'components/ui/CardsContainer.jsx';

class IzinCard extends React.Component {
  state = {
    keteranganDetail: false
  };

  toggleKeteranganDetail = e => {
    e.preventDefault();
    this.setState({ keteranganDetail: !this.state.keteranganDetail });
  }

  render() {
    return (
      <Card>
        <CardBody className="p-0 d-flex align-items-center">
          <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${null || 'default.jpg'}`} width="100" height="100%" className="mr-3 rounded" alt="Izin User" />
          <div className="d-flex justify-content-between align-items-center w-100 mr-3">
            <div className="d-flex flex-column justify-content-center">
              <CardText className="m-0 mb-1 text-dark">Muhammad Novil Fahlevy</CardText>
              <CardText className="m-0 text-sm font-weight-bold">25 Januari 2020 - 3 Februari 2020</CardText>
            </div>
            <Button color="danger" size="sm">Batalkan</Button>
          </div>
        </CardBody>
        <CardFooter className="p-3">
          <CardText className="m-0 text-dark">
            <strong>Alasan</strong>
            <p className="m-0 text-dark">Sakit</p>
          </CardText>
          <CardText className="m-0 text-dark">
            <strong>Keterangan</strong>
              {this.state.keteranganDetail ? (
                <>
                  <p className="m-0 text-dark text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptates autem et beatae cupiditate expedita maiores voluptatibus vitae ipsam impedit.
                  </p>
                  <a href="/" className="text-sm" onClick={this.toggleKeteranganDetail}>Lihat Lebih Sedikit</a>
                </>
              ) : (
                <>
                  <p className="m-0 text-dark text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                  </p>
                  <a href="/" className="text-sm" onClick={this.toggleKeteranganDetail}>Lihat Lengkap</a>
                </>
              )}
          </CardText>
        </CardFooter>
      </Card>
    );
  }
}

class IzinPerhari extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <p className="m-0 text-dark text-lg"><strong>Izin Per Hari</strong></p>
        </CardHeader>
        <CardBody>
          <CardsContainer 
            data={[...Array(20).fill(null)]}
            card={data => (
              <IzinCard />
            )}
            limitOptions={[4, 6, 10]}
            lg="6"
          />
        </CardBody>
      </Card>
    );
  }
}

export default FadeIn(IzinPerhari);