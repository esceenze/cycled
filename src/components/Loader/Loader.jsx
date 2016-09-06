import React from 'react';
import './styles.sass';

const Loader = ({isLoading, isBackgroundLoading}) => {
  if (isLoading) return <div className="loading-screen rti-animation-fade"><div className="spinner"><div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div></div></div>;
  if (!isLoading && isBackgroundLoading) return <div className="mini-loading-screen rti-animation-delay-300 rti-animation-slide-top"><div className="spinner"><div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div></div></div>;
  return null;
};

Loader.propTypes = {
  isLoading: React.PropTypes.bool,
  isBackgroundLoading: React.PropTypes.bool,
};

export default Loader;
