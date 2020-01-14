import React from 'react';

import { Button } from 'reactstrap';

class LoadingButton extends React.Component {
  render() {
    return (
      <Button color={this.props.color} className={`d-flex justify-content-center align-content-center ${this.props.className || ''}`} style={{ position: 'relative' }}>
        <span style={{ opacity: this.props.condition ? 1 : 0, position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>Loading...</span>
        <span style={{ opacity: this.props.condition ? 0 : 1 }}>{this.props.children}</span>
      </Button>
    );
  }
}

export default LoadingButton;