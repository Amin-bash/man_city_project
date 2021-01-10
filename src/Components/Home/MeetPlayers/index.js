import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCard from './Cards';
import './style.scss';
import { Button } from '@material-ui/core';

export default class MeetPlayers extends Component {
	state = {
		show: false
	};
	render() {
		return (
			<Reveal
				onReveal={() => {
					this.setState({ show: true });
				}}
			>
				<div className="home_meetplayers" style={{ background: `#ffffff url(${Stripes})` }}>
					<div className="container">
						<div className="home_meetplayers_wrapper">
							
							<div className="home_text_wrapper">
								<div>
									<Tag
										bck="#0e1731"
										size="100px"
										color="#ffffff"
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										Meet
									</Tag>
								</div>
								<div>
									<Tag
										bck="#0e1731"
										size="100px"
										color="#ffffff"
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										The
									</Tag>
								</div>
								<div>
									<Tag
										bck="#0e1731"
										size="100px"
										color="#ffffff"
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										Players
									</Tag>
								</div>
								<div>
									<Tag
										bck="#ffffff"
										size="27px"
										color="#0e1731"
										link={true}
										lintTo="/the_team"
										add={{
											display: 'inline-block',
											marginBottom: '27px',
											border: '1px solid #0e1731'
										}}
									>
										Meet them here
									</Tag>
								</div>
							</div>
							<div className="home_card_wrapper">
								<HomeCard show={this.state.show} />
							</div>
						</div>
					</div>
				</div>
			</Reveal>
		);
	}
}
