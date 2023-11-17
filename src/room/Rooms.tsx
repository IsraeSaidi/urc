import React, { useState, useEffect } from "react";

import { Room} from "../model/common";
import { CustomError } from "../model/CustomError";
import { Link } from "react-router-dom";
import { getRooms } from "./RoomsApi";



const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    getRooms(
      (roomsData) => {
        setRooms(roomsData);
        setError(null);

      },
      (fetchError) => {
        console.error("Error fetching rooms:", fetchError);
        setRooms([]);
        setError(fetchError);
      }
    );
  }, []);

  return (
    <div style={{marginLeft:'50px' }}>
      <p style={{ textAlign: "center", width: '30%' }}>Salons</p>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {rooms.map((room) => (
          
          
          <Link  key={room.room_id}
          
          style={{
            color: 'black',
            display: 'block',
            width: '20em',
            padding: '13px',
            marginTop: '5px',
            textDecoration:'none',
          
            
          }}
         
          to={`/messages/room/${room.room_id}`}
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
            display: 'block'}}>{room.name}</span>
              <p style={{margin: 0,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: '400',
            fontSize: '0.875rem',
            lineHeight: '1.43',
            letterSpacing: '0.01071em',
            color: 'rgba(0, 0, 0, 0.6)',
            display: 'block'}}>{room.created_on}</p>
            </div>
          </Link>      
        
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
