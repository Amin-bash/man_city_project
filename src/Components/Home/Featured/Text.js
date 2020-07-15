import React, { Component } from 'react';
import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';
import FeaturedPlayer from '../../../Resources/images/featured_player.png';

export default class Text extends Component {
	state = {
		texts: [
			{
				name: '3',
				rotate: 360,
				delay: 400
			},
			{
				name: 'League',
				positionXStart: 503,
				positionXEnd: 273,
				positionY: 450,
				rotate: 0,
				delay: 400
			},
			{
				name: 'Championships',
				positionXStart: 503,
				positionXEnd: 273,
				positionY: 586,
				rotate: 0,
				delay: 500
			},
			{
				name: 'img',
				rotate: 0,
				delay: 800
			}
		]
	};

	animateFirst = () => {
		return this.state.texts.map((text, i) => (
			<Animate
				key={i}
				show={true}
				start={{ opacity: 0, x: [ text.positionX ], y: [ text.positionY ], rotate: 0 }}
				enter={{
					opacity: [ 1 ],
					x: [ text.positionXEnd ],
					y: [ text.positionY ],
					rotate: [ 360 ],
					timing: { duration: 500, ease: easePolyOut, delay: text.delay }
				}}
			>
				{({ opacity, x, y, rotate }) => {
					return (
						<div>
            {text.name === 'img' ? (
								<div
									className="featured_player"
									style={{
										transform: `translate(550px, 202px)`,
										opacity,
										background: `url(${FeaturedPlayer})`,
									}}
								></div>
							) : (
								''
							)}
							{text.name === '3' ? (
								<div
									className="featured_number"
									style={{ opacity, transform: `translate(260px, 170px) rotateY(${rotate}deg)` }}
								>
									{text.name}
								</div>
							) : (
								''
							)}
							{text.positionXStart ? (
								<div
									className="featured_first"
									style={{ opacity, transform: `translate(${x}px, ${y}px)`, zIndex: 2 }}
								>
									{text.name}
								</div>
							) : (
								''
							)}
							
						</div>
					);
				}}
			</Animate>
		));
	};

	render() {
		return (
			<div>
				<div className="featured_wrapper">
					{this.animateFirst()}
				</div>
			</div>
		);
	}
}