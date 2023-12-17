// Messages.tsx
import React, { useState, useEffect, useRef } from "react";
import { getMessagesBetweenUsers, sendMessage } from "./messagesApi";
import { Session, Message } from "../model/common";
import { CustomError } from "../model/CustomError";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

interface MessagesProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Messages: React.FC<MessagesProps> = ({ messages, setMessages }) => {
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as Session);
  const [inputValue, setInputValue] = useState("");
  const emetteur_id = sessionStorage.getItem("user_id") || "0";
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emetteur_id = sessionStorage.getItem("user_id") || "0";
    const urlSegments = window.location.pathname.split("/");
    const recepteur_id = urlSegments[urlSegments.length - 1];

    getMessagesBetweenUsers(
      emetteur_id,
      recepteur_id,
      (result) => {
        setMessages(result);
      },
      (error) => {
        setError(error);
      }
    );

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      sendMessage(
        {
          emetteur_id,
          recepteur_id,
          contenu: data.get("contenu") as string,
        },
        (result) => {
          setMessages((prevMessages) => [...prevMessages, result]);
         
          
        },
        (error) => {
          setError(error);
        }
      );
    } catch (error) {
      console.error(error);
    }

    setInputValue("");
  };

  const formatTimestamp = (timestamp: string | undefined) => {
    if (!timestamp) {
      return "Timestamp not available";
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(timestamp).toLocaleString(undefined, options);
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: "8rem" }}>
      <CssBaseline />
      <div>
        <div
          ref={messagesContainerRef}
          style={{
            maxHeight: "300px", // Set the max height for scrolling
            overflowY: "auto",
          }}
        >
          {messages && messages.map((message, index) => (
            <div key={index}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: message.emetteur_id == emetteur_id ? "left" : "right",
                  bgcolor: message.emetteur_id == emetteur_id ? "#e0e0e0" : "#4caf50",
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                {message.contenu}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  textAlign: message.emetteur_id == emetteur_id ? "left" : "right",
                  color: "#666",
                  marginBottom: "8px"
                }}
              >
                {formatTimestamp(message.created_on)}
              </Typography>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            id="contenu"
            label="Contenu"
            name="contenu"
            variant="standard"
            margin="normal"
            required
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Envoyer
          </Button>
        </form>
        {session.token && (
          <Typography variant="body2">
            {session.username} : {session.token}
          </Typography>
        )}
        {error.message && (
          <Typography color="error">{error.message}</Typography>
        )}
      </div>
    </Container>
  );
};

export default Messages;
