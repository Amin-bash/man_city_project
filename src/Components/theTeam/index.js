import React, { useEffect, useState } from 'react';
import Stripes from '../../Resources/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Fade } from 'react-reveal';
import PlayerCard from '../ui/PlayerCard/PlayerCard';
import './style.scss'
import { CircularProgress } from '@material-ui/core';

const TheTeam = () => {
	const [ state, setState ] = useState({
		loading: true,
		players: []
	});

	useEffect(() => {
		firebasePlayers.once('value').then((snapshot) => {
			const players = firebaseLooper(snapshot);
			let result = [];
			let promises = [];
      
			for (let key in players) {
			  if (players[key].image && players[key].id) {
					result.push(players[key]);
				}
			}
			for (let key in result) {
				promises.push(
					new Promise((resolve, reject) => {
						firebase.storage().ref('players').child(players[key].image).getDownloadURL().then((url) => {
							players[key].url = url;
							resolve();
						});
					})
				);
			}
			Promise.all(promises).then(() => {
				setState((prevState) => {
					prevState.loading = false;
			    prevState.players = result;
			    return { ...prevState };
        });
			});
		});
	}, []);

	const showPlayersByCategory = (category) => {
		return (
			state.players &&
			state.players.map((player, i) => {
				return (
					player.position === category && (
						<Fade left delay={i * 20} key={i}>
							<div className="item">
								<PlayerCard
									number={player.number}
									name={player.name}
									lastname={player.lastname}
									bck={player.url}
								/>
							</div>
						</Fade>
					)
				);
			})
		);
	};

	return (
		<div
			className="the_team_container"
			style={{
				backgroundImage: `url(${Stripes})`
			}}
		>
			{!state.loading ? (
				<div>
					<div className="team_category_wrapper">
						<div className="title">Keepers</div>
						<div className="team_cards">{showPlayersByCategory("Keeper")}</div>
					</div>

          <div className="team_category_wrapper">
						<div className="title">Defence</div>
						<div className="team_cards">{showPlayersByCategory("Defence")}</div>
					</div>

          <div className="team_category_wrapper">
						<div className="title">Midfield</div>
						<div className="team_cards">{showPlayersByCategory("Midfield")}</div>
					</div>

          <div className="team_category_wrapper">
						<div className="title">Strikers</div>
						<div className="team_cards">{showPlayersByCategory("Striker")}</div>
					</div>
          
				</div>
			): (
				<div className="progress_circular">
				<CircularProgress thickness={5} size={130} style={{ color: '#98c5e9' }} />
				</div>
			)}
		</div>
	);
};

export default TheTeam;
