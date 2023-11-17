import { User, ErrorCallback, Callback, Room } from "../model/common";
import { CustomError } from "../model/CustomError";

export function getRooms(onResult: Callback<Room[]>, onError: ErrorCallback) {
    const token = sessionStorage.getItem('token'); 
    fetch("/api/rooms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
    })
        .then(async (response) => {
            if (response.ok) {
                const rooms = await response.json();
                onResult(rooms);
                
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        })
        .catch((error) => {
            console.log(error);
            onError(error);
        });
}
