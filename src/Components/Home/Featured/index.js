import React from 'react';
import Stripes from './Stripes';
import Text from './Text';
import './styles.scss'

const Featured = () => {
  return (
    <div className="featured_wrapper">
      <Stripes />
      <Text />
    </div>
  );
};

export default Featured;