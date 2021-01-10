import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CityLogo } from '../ui/icons';
import { firebase } from '../../firebase';
import { IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './style.scss';
import SideDrawer from '../ui/SideDrawer/SideDrawer';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Header = () => {
	const [ emailAdmin, setEmailAdmin ] = useState('');
	const [ state, setState ] = useState({
		drawerOpen: false,
		headerShow: false
	});

	firebase.auth().onAuthStateChanged((user) => {
		if (user !== null) {
			setEmailAdmin(user.email);
		} else {
			setEmailAdmin('');
		}
	});

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

	const toggleDrawer = (value) => {
		setState({ ...state, drawerOpen: value });
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar
			  className="header-nav"
				position="fixed"
				style={{
					backgroundColor: '#98c5e9',
					boxShadow: 'none',
					padding: '10px 0',
					borderBottom: '2px solid #00285e'
				}}
			>
				<Toolbar>
					<div style={{ flexGrow: 1 }}>
						<div className="header_logo">
							<CityLogo link={true} linkTo="/" width="70px" height="70px" />
						</div>
					</div>
					{width < breakpoint ? (
						<IconButton
							aria-label="Menu"
							className={classes.menuButton}
							color="inherit"
							onClick={() => toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
					) : (
						<div>
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
						</div>
					)}
					<SideDrawer
						open={state.drawerOpen}
						emailAdmin={emailAdmin}
						onClose={(value) => toggleDrawer(value)}
					/>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
