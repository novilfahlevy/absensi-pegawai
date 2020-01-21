import React from 'react';

import { Button } from 'reactstrap';

class LoadingButton extends React.Component {
  render() {
    return (
      <Button type={this.props.type || "button"} color={this.props.color} className={`d-flex justify-content-center align-content-center ${this.props.className || ''}`} style={{ position: 'relative' }} disabled={this.props.condition || this.props.disabled}>
        <span style={{ opacity: this.props.condition ? 1 : 0, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ 'margin': 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="50px" height="40px" viewBox="0 0 100 100">
            <rect x="17.5" y="30" width="15" height="40" fill="#ffffff">
              <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>
            </rect>
            <rect x="42.5" y="30" width="15" height="40" fill="rgba(255, 255, 255, 0.7424996652910787)">
              <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>
            </rect>
            <rect x="67.5" y="29.9984" width="15" height="40.0032" fill="rgba(255, 255, 255, 0.566370633033014)">
              <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
            </rect>
          </svg>
        </span>
        <span style={{ opacity: this.props.condition ? 0 : 1 }}>{this.props.children}</span>
      </Button>
    );
  }
}

export default LoadingButton;