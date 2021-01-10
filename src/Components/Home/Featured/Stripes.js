import React, { Component, useState } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import './styles.scss';

const Stripes = () => {
	const [ state, setstate ] = useState({
		stripes: [
			{
				background: '#98cfe9',
				left: 75,
				rotate: 25,
				top: -260,
				delay: 0
			},
			{
				background: '#ffffff',
				left: 200,
				rotate: 25,
				top: -397,
				delay: 200
			},
			{
				background: '#98cfe9',
				left: 325,
				rotate: 25,
				top: -498,
				delay: 400
			}
		]
	});

	

	const showStripes = () => {
			return state.stripes.map((stripe, i) => (
				<Animate
					key={i}
					show={true}
					start={{ background: '#ffffff', opacity: 0, left: 0, rotate: 0, top: 0 }}
					enter={{
						background: stripe.background,
						opacity: 1,
						left: [ stripe.left ],
						rotate: [ stripe.rotate ],
						top: [ stripe.top ],
						timing: { delay: stripe.delay, duration: 200, easePolyOut }
					}}
				>
					{({ left, opacity, background, rotate, top }) => {
						return (
							<div
								className="stripe"
								style={{
									background,
									opacity,
									left,
									transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
								}}
							/>
						);
					}}
				</Animate>
			));
	};

	return <div className="featured_stripes">{showStripes()}</div>;
};

export default Stripes;
