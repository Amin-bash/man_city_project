import React, { useEffect, useState } from 'react';
import Stripes from './Stripes';
import Text from './Text';
import './styles.scss'
import FeaturedPlayer from '../../../Resources/images/featured_player.png';

const Featured = () => {
  const useViewport = () => {
		const [ width, setWidth ] = useState(process.browser && window.innerWidth);

		useEffect(() => {
			const handleWindowResize = () => setWidth(process.browser && window.innerWidth);
			window.addEventListener('resize', handleWindowResize);
			return () => window.removeEventListener('resize', handleWindowResize);
		}, []);
		// Return the width so we can use it in our components
		return { width };
	};

	const { width } = useViewport();
  const breakpoint = 950;
  if (width > breakpoint) {
    return (
      <div className="featured_wrapper">
        <Stripes />
        <Text />
      </div>
    );
  } else {
    return (
      <div className="featured_wrapper">
        <div className="featured-image-sm" style={{background: `url(${FeaturedPlayer})`}}></div>
        <div>
          <div className="wins-number">3</div>
          <div className="champions">
            <p className="champ-p">Championships</p>
            <p className="league-p">League</p>
          </div>
        </div>
      </div>
    )
  }
};

export default Featured;
