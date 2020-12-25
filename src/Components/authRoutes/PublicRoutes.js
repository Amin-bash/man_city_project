import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
	// console.log('the rest is ', rest);
	// console.log(' user ', user);
	return (
		<Route
			{...rest}
			component={(props) =>
				rest.restricted ? user ? (
					<Redirect to="/admin_matches" />
				) : (
					<Comp {...props} user={user} />
				) : (
					<Comp {...props} user={user} />
				)}
		/>
	);
};

export default PublicRoutes;
