import { CustomError } from "../model/CustomError";

// Assurez-vous que la définition de Message contient les bonnes propriétés
interface Message {
  emetteur_id: string;
  recepteur_id: string;
  contenu: string;
  // ... autres propriétés
}

export async function getMessagesBetweenUsers(
  user_id_1: string,
  user_id_2: string,
  onResult: (result: Message[]) => void,
  onError: (error: CustomError) => void
) {
  try {
    const response = await fetch(`/api/message?user_id_1=${user_id_1}&user_id_2=${user_id_2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const result = await response.json() as Message[];
      onResult(result);
    } else {
      const error = await response.json().catch(() => null) as CustomError;
      onError(error || { message: "An error occurred." });
    }
  } catch (error) {
    console.error("Error in getMessagesBetweenUsers:", error);
    onError({
      message: "Network error occurred.",
      name: "NetworkError",
    });
  }
}


export function sendMessage(message: Message, onResult: (result: Message) => void, onError: (error: CustomError) => void) {
  fetch("/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, 
    },
    body: JSON.stringify(message),
  })
    .then(async (response) => {
      if (response.status === 200) {
        const result = await response.json() as Message;
        
        onResult(result);
      } else {
        const error = await response.json().catch(() => null) as CustomError;
        onError(error || { message: "An error occurred." });
      }
    })
    .catch((networkError) => {
      return onError({
        message: "",
        name: networkError.message,
      });
    });
}
