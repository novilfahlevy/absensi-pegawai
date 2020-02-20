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

    const { 
      name, 
      profile, 
      tanggal_mulai, 
      tanggal_selesai, 
      alasan, 
      keterangan, 
      izin_by 
    } = this.props.user;

    return (
      <Card>
        <CardBody className="p-0 d-flex align-items-center">
          <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${profile || 'default.jpg'}`} width="100" height="100%" className="mr-4 rounded" alt="Izin User" />
          <div className="d-flex justify-content-between align-items-center w-100 mr-3">
            <div className="d-flex flex-column justify-content-center">
              <CardText className="m-0 mb-1 text-dark">{name}</CardText>
              <CardText className="m-0 text-sm font-weight-bold">
                {tanggal_mulai}
                <span className="font-weight-normal mx-1">s.d.</span>
                {tanggal_selesai}
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
              <span className="m-0 text-dark d-block">{izin_by}</span>
            </CardText>
            <CardText className="m-0 text-dark">
              <strong>Alasan</strong>
              <span className="m-0 text-dark d-block">{alasan}</span>
            </CardText>
            <CardText className="m-0 text-dark">
              <strong>Keterangan</strong>
              <span className="m-0 text-dark text-sm d-block">
                {keterangan || '-'}
              </span>
            </CardText>
          </CardFooter>
        </UncontrolledCollapse>
      </Card>
    );
  }
}

export default FadeIn(RiwayatIzinCard);