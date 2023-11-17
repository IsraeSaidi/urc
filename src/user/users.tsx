import React, { useState, useEffect } from "react";
import { getUsers } from "./usersApi";
import { User } from "../model/common";
import { CustomError } from "../model/CustomError";
import { Link } from "react-router-dom";



const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    getUsers(
      (usersData) => {
        const filteredUsers = usersData.filter(user => user.username !== sessionStorage.getItem('username'));
        setUsers(filteredUsers);
        setError(null);

      },
      (fetchError) => {
        console.error("Error fetching users:", fetchError);
        setUsers([]);
        setError(fetchError);
      }
    );
  }, []);

  return (
    <div style={{marginLeft:'50px' }}>
      <p style={{ textAlign: "center", width: '30%' }}>Utilisateurs</p>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {users.map((user) => (
          
          
          <Link  key={user.user_id}
          
          style={{
            color: 'black',
            display: 'block',
            width: '20em',
            padding: '13px',
            marginTop: '5px',
            textDecoration:'none',
          
            
          }}
         
          to={`/messages/user/${user.user_id}`}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#EEEEEE'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
            <div style={{
              
            }}>
            <span style={{margin: 0,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: '400',
            fontSize: '1rem',
            lineHeight: '1.5',
            letterSpacing: '0.00938em',
            display: 'block'}}>{user.username}</span>
              <p style={{margin: 0,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: '400',
            fontSize: '0.875rem',
            lineHeight: '1.43',
            letterSpacing: '0.01071em',
            color: 'rgba(0, 0, 0, 0.6)',
            display: 'block'}}>{user.last_login}</p>
            </div>
          </Link>      
        
        ))}
      </ul>
    </div>
  );
};

export default Users;