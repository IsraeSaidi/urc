import { getConnecterUser, triggerNotConnected } from "../lib/session";
import { db } from '@vercel/postgres';
import { kv } from "@vercel/kv";

export default async (request, response) => {
    try {
        const headers = new Headers(request.headers);
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }

     
        if (request.method === 'GET') {
            const { user_id_1, user_id_2 } = request.query;
        
            if (!user_id_1 || !user_id_2) {
                response.status(400).send("Les IDs d'utilisateurs doivent être fournis.");
                return;
            }
        
            try {
                const messages = await db.query(
                    'SELECT * FROM messages WHERE (emetteur_id = $1 AND recepteur_id = $2) OR (emetteur_id = $2 AND recepteur_id = $1) ORDER BY Created_on ASC',
                    [user_id_1, user_id_2]
                );
        
                response.status(200).json(messages.rows);
            } catch (error) {
                console.error("Error executing database query:", error);
                response.status(500).send("Erreur lors de la récupération des messages.");
            }
        
        } else if (request.method === 'POST') {
      
            const { emetteur_id, recepteur_id, contenu } = await request.body;
            const result = await db.query(
                'INSERT INTO messages (emetteur_id, recepteur_id, contenu) VALUES ($1, $2, $3) RETURNING *',
                [emetteur_id, recepteur_id, contenu]
            );
            response.status(200).send("OK");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Erreur interne du serveur.");
    }
};
