import React from 'react';

import { Button } from 'reactstrap';
import 'assets/css/components/ui/loading.css';

// cara make
/*

<LoadingButton color="primary" condition={kondisi loading}>
  Tulisan Tombol
</LoadingButton>

Attribute:
color = warna tombol di bootstrap
condition = kondisi untuk loading nya (true atau false), nentuin dia lagi loading atau gk.

*/

class LoadingButton extends React.Component {
  render() {
    return (
      <Button color={this.props.color} className={`d-flex justify-content-center align-content-center ${this.props.className || ''}`} style={{ position: 'relative' }} disabled={this.props.condition}>
        <span style={{ opacity: this.props.condition ? 1 : 0, position: 'absolute', left: '50%', transform: 'translate(-50%)' }}>
          <svg width="100" height="12" viewBox="0 0 415 89" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="loading">
              <rect id="Rectangle 1" width="415" height="89" fill="transparent"/>
              <circle id="dot1" cx="111" cy="44" r="27" fill="#fff" />
              <circle id="dot2" cx="208" cy="44" r="27" fill="#fff" />
              <circle id="dot3" cx="305" cy="44" r="27" fill="#fff" />
            </g>
          </svg>
        </span>
        <span style={{ opacity: this.props.condition ? 0 : 1 }}>{this.props.children}</span>
      </Button>
    );
  }
}

export default LoadingButton;