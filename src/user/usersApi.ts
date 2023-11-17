import { User, ErrorCallback, Callback } from "../model/common";
import { CustomError } from "../model/CustomError";

export function getUsers(onResult: Callback<User[]>, onError: ErrorCallback) {
    const token = sessionStorage.getItem('token'); 
    fetch("/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
    })
        .then(async (response) => {
            if (response.ok) {
                const users = await response.json();
                onResult(users);
                
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
