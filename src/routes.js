import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatch from './Components/Admin/Matches/AddEditMatch';
import AdminPlayers from './Components/Admin/Players';
import AddEditPlayers from './Components/Admin/Players/AddEditPlayers';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from './Components/ui/not_found';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} exact  path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
        <PrivateRoutes {...props} exact  path="/admin_players/add_players" exact component={AddEditPlayers} />
        <PrivateRoutes {...props} exact  path="/admin_players" component={AdminPlayers} />
        <PrivateRoutes {...props} exact  path="/admin_matches/edit_match" component={AddEditMatch} />
        <PrivateRoutes {...props} exact  path="/admin_matches/edit_match/:id" component={AddEditMatch} />
        <PrivateRoutes {...props} exact  path="/admin_matches" component={AdminMatches} />
        <PrivateRoutes {...props} exact  path="/dashboard" component={Dashboard} />
        <PublicRoutes {...props} exact restricted={true}  path="/sign_in" component={SignIn} />
        <PublicRoutes {...props} exact restricted={false}  path="/the_team" component={TheTeam} />
        <PublicRoutes {...props} exact restricted={false}  path="/the_matches" component={TheMatches} />
        <PublicRoutes {...props} exact restricted={false}  path="/" component={Home} />
        <PublicRoutes {...props}  restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  )
}
export default Routes;
