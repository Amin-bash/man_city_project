import React from 'react';
import './style.scss';
import { Button, Drawer, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {
	return (
		<Drawer className="side-drawer" anchor="right" open={props.open} onClose={() => props.onClose(false)}>
			<List className="sm-nav-list" component="nav">
				<Link to="/the_team">
					<Button onClick={() => props.onClose(false)} color="inherit">The Team</Button>
				</Link>
				<Link to="/the_matches">
					<Button onClick={() => props.onClose(false)} color="inherit">Matches</Button>
				</Link>
				<Link to="/admin_matches">
					<Button onClick={() => props.onClose(false)} color="inherit">Dashboard</Button>
				</Link>
				{props.emailAdmin && <Button color="inherit">{props.emailAdmin}</Button>}
			</List>
		</Drawer>
	);
};

export default SideDrawer;
