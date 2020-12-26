import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CityLogo } from '../ui/icons';
import { firebase } from '../../firebase';
import './style.scss'

const Header = () => {
  const [emailAdmin, setEmailAdmin] = useState('');

  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      setEmailAdmin(user.email);
    } else {
      setEmailAdmin('');
		}
  });
	
	return (
		<AppBar
			position="fixed"
			style={{
				backgroundColor: '#98c5e9',
				boxShadow: 'none',
				padding: '10px 0',
				borderBottom: '2px solid #00285e'
			}}
		>
			<Toolbar style={{ display: 'flex' }}>
				<div style={{ flexGrow: 1 }}>
					<div className="header_logo">
						<CityLogo link={true} linkTo="/" width="70px" height="70px" />
					</div>
				</div>
				<Link to="/the_team">
					<Button color="inherit">The Team</Button>
				</Link>
				<Link to="/the_matches">
					<Button color="inherit">Matches</Button>
				</Link>
				<Link to="/admin_matches">
					<Button color="inherit">Dashboard</Button>
				</Link>
        {emailAdmin && <Button color="inherit">{emailAdmin}</Button>}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
