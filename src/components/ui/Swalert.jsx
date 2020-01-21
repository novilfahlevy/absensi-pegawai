import React from 'react';
import Swal from 'sweetalert2';

/*
  Contoh:
  <Alert type="danger" title="Gagal!" text="Gagal!" buttonText="OK!" />  
*/

export class Alert extends React.Component {
  componentDidMount() {
    Swal.fire({
      html: `<h2>${this.props.text}</h2>`,
      title: this.props.title,
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
  <Confirm title="" type="success" text="Mau gak?" confirmText="Iya!" cancelText="Gak!" callback={result => alert(result)} />
*/

export class Confirm extends React.Component {
  componentDidMount() {
    Swal.fire({
      html: `<h2>${this.props.text}</h2>`,
      icon: this.props.type,
      title: this.props.title,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: this.props.cancelText || 'Gak jadi!',
      cancelButtonColor: '#d33',
      confirmButtonText: this.props.confirmText || 'OK!'
    }).then(({ value }) => this.props.callback(value));
  }

  render() { return <></>; }
}