import { db } from '@vercel/postgres';
import { kv } from "@vercel/kv";
import { arrayBufferToBase64, stringToArrayBuffer } from "../lib/base64";

export const config = {
    runtime: 'edge',
};
export default async function handler(request) {
    try {
        const {username,email, password} = await request.json();
        const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
        const hashed64 = arrayBufferToBase64(hash);

        const client = await db.connect();
        const {rowCount, rows} = await client.sql`select * from users where username = ${username} or email = ${email}`;
        if (rowCount !== 0) {
            const error = {code: "UNAUTHORIZED", message: "Cet utilisateur existe déjà"};
            return new Response(JSON.stringify(error), {
                status: 401,
                headers: {'content-type': 'application/json'},
            });
        } else {
            const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
        const hashedPassword = arrayBufferToBase64(hash);

        // Générer external_id
        const externalId = crypto.randomUUID().toString();

        // Enregistrer le nouvel utilisateur en base de données
        const client = await db.connect();
        const result = await client.sql`insert into users (username, password, email, external_id, created_on) values (${username}, ${hashedPassword}, ${email}, ${externalId}, NOW()) returning user_id`;
        const userId = result.rows[0].user_id;

        // Connecter automatiquement le nouvel utilisateur (générer un token)
        const token = crypto.randomUUID().toString();
        const user = { id: userId, username, email, externalId };
        await kv.set(token, user, { ex: 3600 });
        const userInfo = {};
        userInfo[user.id] = user;
        await kv.hset("users", userInfo);

        return new Response(JSON.stringify({ token, username, externalId, id: userId }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {'content-type': 'application/json'},
        });
    }
};


  