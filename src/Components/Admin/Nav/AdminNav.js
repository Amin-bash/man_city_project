import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import {firebase} from '../../../firebase'

const AdminNav = () => {

  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches'
    },
    {
      title: 'Add Matches',
      linkTo: '/admin_matches/edit_match'
    },
    {
      title: 'Players',
      linkTo: '/admin_players'
    },
    {
      title: 'Add Players',
      linkTo: '/admin_players/add_player'
    }
  ]

  const styles = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom: '1px solid #353535'
  }

  const renderItems = () => (
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={styles}>{link.title}</ListItem>
      </Link>
    ))
  )

  const logoutHandler = () => {
    // firebase.auth().signOut().then(()=> {
    //   console.log('succ sign out');
    // }),(error) => {
    //   console.log('there is and error');
    // }
    firebase.auth().signOut().then(()=> {
      console.log('succ logout');
    }, (error) => {
      console.log('somthing happened');
       
    })
  }

  return (
    <div>
      {renderItems()}
       <ListItem button style={styles} onClick={() => logoutHandler()}>Log out</ListItem>
    </div>
  );
};

export default AdminNav;