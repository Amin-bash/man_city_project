import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import './styles.scss'

export default class Stripes extends Component {
	state = {
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
	};

	showStripes = () => {
		return this.state.stripes.map((stripe, i) => (
			<Animate
				key={i}
				show={true}
				start={{ background: '#ffffff', opacity: 0, left: 0, rotate: 0, top: 0 }}
				enter={{
					background:  stripe.background ,
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
							style={{ background, opacity, left, transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)` }}
						/>
					);
				}}
			</Animate>
		));
	};
	render() {
		return <div className="featured_stripes"  >{this.showStripes()}</div>;
	}
}
