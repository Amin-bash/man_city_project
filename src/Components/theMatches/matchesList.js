import React, { Component } from 'react';
import { easePolyInOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';
import './style.scss';

export default class MatchesList extends Component {
	state = {
		matchesList: []
	};

	static getDerivedStateFromProps(props, state) {
		return (state = {
			matchesList: props.matches
		});
	}

	showMatches = () =>
		this.state.matchesList && (
			<NodeGroup
				data={this.state.matchesList}
				keyAccessor={(d) => d.id}
				start={() => ({
					opacity: 0,
					x: -200
				})}
				enter={(d, i) => ({
					opacity: [ 1 ],
					x: [ 0 ],
					timing: { duration: 500, delay: i * 50, ease: easePolyInOut }
				})}
				update={(d, i) => ({
					opacity: [ 1 ],
					x: [ 0 ],
					timing: { duration: 500, delay: i * 50, ease: easePolyInOut }
				})}
				leave={(d, i) => ({
					opacity: [ 0 ],
					x: [ -200 ],
					timing: { duration: 500, delay: i * 50, ease: easePolyInOut }
				})}
			>
				{(nodes) => (
					<div>
						{nodes.map(({ key, data, state: { x, opacity } }) => {
							if (data.localThmb) {
								return <div
									key={key}
									style={{ opacity, transform: `translate(${x}px)` }}
									className="match_box_big"
								>
									<div className="block_wraper">
										<div className="block">
											<div
												className="icon"
												style={{ background: `url(/images/team_icons/${data.localThmb}.png)` }}
											/>
											<div className="team">{data.local}</div>
											<div className="result">{data.resultLocal}</div>
										</div>

                    <div className="block">
											<div
												className="icon"
												style={{ background: `url(/images/team_icons/${data.awayThmb}.png)` }}
											/>
											<div className="team">{data.away}</div>
											<div className="result">{data.resultAway}</div>
										</div>
									</div>
                  <div className="block_wraper nfo">
                    <div><strong>Date:</strong> {data.date}</div>
                    <div><strong>Stadium:</strong> {data.stadium}</div>
                    <div><strong>Referee:</strong> {data.referee}</div>
                  </div>
								</div>;
							}
						})}
					</div>
				)}
			</NodeGroup>
		);

	render() {
		return <div>{this.showMatches()}</div>;
	}
}
