import React from 'react';

import {
  Card,
  CardBody,
  CardText,
  CardFooter,
  Button,
  UncontrolledCollapse,
} from 'reactstrap';

import FadeIn from 'components/hoc/FadeIn.jsx';

class RiwayatIzinCard extends React.Component {
  render() {
    const toggler = btoa(Math.random() * 3).slice(0, 5).toLowerCase();

    return (
      <Card>
        <CardBody className="p-0 d-flex align-items-center">
          <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${null || 'default.jpg'}`} width="100" height="100%" className="mr-4 rounded" alt="Izin User" />
          <div className="d-flex justify-content-between align-items-center w-100 mr-3">
            <div className="d-flex flex-column justify-content-center">
              <CardText className="m-0 mb-1 text-dark">Muhammad Novil Fahlevy</CardText>
              <CardText className="m-0 text-sm font-weight-bold">
                Senin, 25 Januari 2020
                <span className="font-weight-normal mx-1">s.d.</span>
                Rabu, 27 Januari 2020
              </CardText>
            </div>
            <Button color="primary" size="sm" id={toggler}>
              <span className="fas fa-eye"></span>
            </Button>
          </div>
        </CardBody>
        <UncontrolledCollapse style={{ transition: '0.1s' }} toggler={`#${toggler}`}>
          <CardFooter className="p-3">
            <CardText className="m-0 text-dark">
              <strong>Izin dari</strong>
              <p className="m-0 text-dark">Eddy Gunawan</p>
            </CardText>
            <CardText className="m-0 text-dark">
              <strong>Alasan</strong>
              <p className="m-0 text-dark">Sakit</p>
            </CardText>
            <CardText className="m-0 text-dark">
              <strong>Keterangan</strong>
              <p className="m-0 text-dark text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptates autem et beatae cupiditate expedita maiores voluptatibus vitae ipsam impedit.
              </p>
            </CardText>
          </CardFooter>
        </UncontrolledCollapse>
      </Card>
    );
  }
}

export default FadeIn(RiwayatIzinCard);