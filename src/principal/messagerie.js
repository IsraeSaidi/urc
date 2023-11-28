import React from 'react';
import Users from '../user/users';
import Rooms from '../room/Rooms';
import Messages from '../message/Messages';

function Messagerie() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <Users />
        <Rooms />
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'fixed', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', marginLeft:'12%'}}>
          <Messages />
        </div>
      </div>
    </div>
  );
}

export default Messagerie;
