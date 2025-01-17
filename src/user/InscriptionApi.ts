import {Session, SessionCallback, ErrorCallback, User} from "../model/common";
import {CustomError} from "../model/CustomError";

export function inscriptionUser(user: User, onResult: SessionCallback, onError: ErrorCallback) {
    fetch("/api/inscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(async (response) => {
        if (response.ok) {
            const session = await response.json() as Session;
            // Consider using more secure storage mechanisms
            sessionStorage.setItem('token', session.token);
            sessionStorage.setItem('externalId', session.externalId);
            sessionStorage.setItem('username', session.username || "");
            onResult(session);
        } else {
            const error = await response.json().catch(() => null) as CustomError;
            onError(error || { message: "An error occurred." });
        }
    })
    .catch((networkError) => {
        return onError({
            message: "Network error occurred.", name: networkError.message
            
        });
    });
}
