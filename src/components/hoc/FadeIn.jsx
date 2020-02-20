import React from 'react';
import FadeIn from 'react-fade-in';

export default (Component, Header = () => <React.Fragment></React.Fragment>) => props => (
  <>
    <Header />
    <FadeIn transitionDuration="200" delay={props.fadeInDelay || 50}>
      <Component {...props} />
    </FadeIn>
  </>
);