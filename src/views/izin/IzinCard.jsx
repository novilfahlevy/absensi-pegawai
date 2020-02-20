import React from 'react';
import Swal from 'sweetalert2';
import api from 'store/api.js';

import {
  Card,
  CardBody,
  CardText,
  CardFooter,
  Button,
  UncontrolledCollapse
} from 'reactstrap';

import FadeIn from 'components/hoc/FadeIn.jsx';

class IzinCard extends React.Component {
  cancelIzin = () => {
    Swal.fire({
      title: 'Batalkan Izin',
      text: "Apakah anda ingin membatalkan izin user ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Batalkan Izin'
    })
    .then(({ value }) => {
      if ( value ) {
        api().delete(`izin/${this.props.user.izin_id}/cancel`)
        .then(response => {
          if ( response.data.status === 400 ) {
            Swal.fire(
              'Gagal Membatalkan Izin',
              'Izin mungkin sudah dibatalkan oleh admin lain.',
              'error'
            );
          } 
          else {
            Swal.fire(
              'Berhasil Membatalkan Izin',
              'Izin berhasil dibatalkan.',
              'success'
            );
          }
          this.props.getIzinToday();
        });
      }
    });
  }

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
          <img src={`${process.env.REACT_APP_BASE_URL}storage/profiles/${profile || 'default.jpg'}`} width="100" height="100%" className="mr-3 rounded" alt="Izin User" />
          <div className="d-flex justify-content-between align-items-center w-100 mr-3">
            <div className="d-flex flex-column justify-content-center">
              <CardText className="m-0 mb-1 text-dark">{name}</CardText>
              <CardText className="m-0 text-sm">
                <b>{tanggal_mulai}</b> s.d. <b>{tanggal_selesai}</b>
              </CardText>
            </div>
            <div>
              <Button color="primary" id={toggler} size="sm">
                <span className="fas fa-eye"></span>
              </Button>
              <Button color="danger" size="sm" onClick={this.cancelIzin}>
                <span className="fas fa-times"></span>
              </Button>
            </div>
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
              <span className="m-0 text-dark d-block text-sm">
                {keterangan || '-'}
              </span>
            </CardText>
          </CardFooter>
        </UncontrolledCollapse>
      </Card>
    );
  }
}

export default FadeIn(IzinCard);