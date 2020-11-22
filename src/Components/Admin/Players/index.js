import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { Link } from 'react-router-dom';

const AdminPlayers = () => {
	const [ state, setState ] = useState({
		isLoading: true,
		players: []
	});

	useEffect(() => {
		firebasePlayers.once('value').then((snapshot) => {
			const players = firebaseLooper(snapshot);
			setState((prevState) => {
				prevState.isLoading = false;
				prevState.players = reverseArray(players);
				return { ...prevState };
			});
		});
	}, []);

	return (
		<AdminLayout>
			<div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>First name</TableCell>
								<TableCell>Last name</TableCell>
								<TableCell>Number</TableCell>
								<TableCell>Position</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.players &&
								state.players.map((player, i) => (
									<TableRow key={i}>
										<TableCell>
											<Link to={`/admin_players/add_players/${player.id}`}>{player.name}</Link>
										</TableCell>
										<TableCell>
											<Link to={`/admin_players/add_players/${player.id}`}>
												{player.lastname}
											</Link>
										</TableCell>
										<TableCell>
											<Link to={`/admin_players/add_players/${player.id}`}>{player.number}</Link>
										</TableCell>
										<TableCell>
											<Link to={`/admin_players/add_players/${player.id}`}>
												{player.position}
											</Link>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Paper>
				<div className="admin_progress">
					{state.isLoading ? <CircularProgress thickness={7} style={{ color: '#98c5e9' }} /> : ''}
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminPlayers;
