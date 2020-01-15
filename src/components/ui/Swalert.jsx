import React from 'react';
import Swal from 'sweetalert2';

/*
  Contoh:
  <Alert type="danger" text="Gagal!" buttonText="OK!" />  
*/

export class Alert extends React.Component {
  componentDidMount() {
    Swal.fire({
      html: `<h2>${this.props.text}</h2>`,
      icon: this.props.type,
      confirmButtonColor: '#3085d6',
      confirmButtonText: this.props.buttonText || 'OK',
      reverseButton: true
    });
  }

  render() { return <></>; }
}

/*
  Contoh:
  <Confirm type="success" text="Mau gak?" confirmText="Iya!" cancelText="Gak!" callback={result => alert(result)} />
*/

export class Confirm extends React.Component {
  componentDidMount() {
    Swal.fire({
      html: `<h2>${this.props.text}</h2>`,
      icon: this.props.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: this.props.cancelText || 'Gak jadi!',
      cancelButtonColor: '#d33',
      confirmButtonText: this.props.confirmText || 'OK!'
    }).then(({ value }) => this.props.callback(value));
  }

  render() { return <></>; }
}