import React from 'react';
import { useParams } from 'react-router-dom';
import Users from '../user/users';
import Rooms from '../room/Rooms';
import NavBar from './navBar';

function Messagerie() {
  const { user_id } = useParams();
  console.log('Messagerie component rendered with user_id:', user_id);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <NavBar/>
        <Users />
        <Rooms />
      </div>
      
    </div>
  );
}

export default Messagerie;
