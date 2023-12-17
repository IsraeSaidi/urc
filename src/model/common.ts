import {CustomError} from "./CustomError";

export const AUTHENT_HEADER = "Authentication";
export const BEARER = "Bearer ";

export interface User {
    user_id: number;
    username: string;
    email?: string;
    password: string;
    last_login?: string;
    external_id?: string;
}

export interface Room {
    room_id: number;
    name: string;
    created_on?: string;
   
}

export interface Message {

    emetteur_id: string;
    recepteur_id: string;
    contenu: string;
    created_on?: string;
   
}

export interface Session {
    token: string;
    username?: string;
    id?: string;
    externalId: string;
}


export interface EmptyCallback {
    (): void;
}

export interface SessionCallback {
    (session: Session): void;
}


export interface ErrorCallback {
    (error: CustomError): void;
}

export interface Callback<T> {
    (result: T): void;
}
