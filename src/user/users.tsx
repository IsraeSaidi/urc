// Users.js
import React, { useState, useEffect } from "react";
import { getUsers } from "./usersApi";
import { Message, User } from "../model/common";
import { CustomError } from "../model/CustomError";
import { Link, useNavigate } from "react-router-dom";
import { getMessagesBetweenUsers } from "../message/messagesApi";
import Messages from "../message/Messages";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<CustomError | null>(null);
  const [messages, setMessages] = useState([] as Message[]);
  const navigate = useNavigate();

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

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, userId: number) => {
    event.preventDefault();
    const emetteur_id = sessionStorage.getItem("user_id") || "0";

    getMessagesBetweenUsers(
      emetteur_id,
      userId.toString(),
      (result) => {
        setMessages(result);
        console.log(result);
      },
      (error) => {
        setError(error);
      }
    );

    navigate(`/messages/user/${userId}`);
  };

  return (
    <div >
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', marginLeft: '12%' }}>
        <Messages messages={messages} setMessages={setMessages} />
      </div>
      <div>
        <p style={{ textAlign: "center", width: '30%' }}>Utilisateurs</p>
        {error && <p>Error: {error.message}</p>}
        <ul>
          {users.map((user) => (
            <Link
              key={user.user_id}
              style={{
                color: 'black',
                display: 'block',
                width: '20em',
                padding: '13px',
                marginTop: '5px',
                textDecoration: 'none',
              }}
              to={`/messages/user/${user.user_id}`}
              onClick={(e) => handleClick(e, user.user_id)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#EEEEEE'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
            >
              <div>
                <span style={{
                  margin: 0,
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  fontWeight: '400',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  letterSpacing: '0.00938em',
                  display: 'block'
                }}>{user.username}</span>
                <p style={{
                  margin: 0,
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  fontWeight: '400',
                  fontSize: '0.875rem',
                  lineHeight: '1.43',
                  letterSpacing: '0.01071em',
                  color: 'rgba(0, 0, 0, 0.6)',
                  display: 'block'
                }}>{user.last_login}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
