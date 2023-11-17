import {useState} from "react";
import { inscriptionUser } from "./InscriptionApi";
import {Session} from "../model/common";
import {CustomError} from "../model/CustomError";
import { Button, TextField, Typography, Container, CssBaseline } from "@mui/material";

export function Inscription() {

    const [error, setError] = useState({} as CustomError);
    const [session, setSession] = useState({} as Session);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
    
        inscriptionUser(
            {
                user_id: -1,
                username: data.get('login') as string,
                email: data.get('email') as string,
                password: data.get('password') as string,
            },
            (result: Session) => {
                console.log(result);
                setSession(result);
                form.reset();
                setError(new CustomError(""));
            },
            (loginError: CustomError) => {
                console.log(loginError);
                setError(loginError);
                setSession({} as Session);
            }
        );
    };
    

    return( 
    <Container component="main" maxWidth="xs" sx={{ mt: '8rem' }}>
    <CssBaseline />
    <div>
      <Typography component="h1" variant="h5" fontWeight={'bold'} textAlign={'center'}>
        Créer compte
      </Typography>
      <form onSubmit={handleSubmit}>
      
        <TextField id="login" label="Login" name="login" variant="standard" margin="normal" required fullWidth  />
        <TextField id="email" label="Email" name="email" variant="standard" type="email" margin="normal" required fullWidth  />
        <TextField id="password" label="Password" name="password" variant="standard" type="password" margin="normal" required fullWidth  />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Enregistrer
        </Button>
      </form>
      {session.token && (
        <Typography variant="body2">
          {session.username} : {session.token}
        </Typography>
      )}
      {error.message && <Typography color="error">{error.message}</Typography>}
    </div>
  </Container>
       
    );
}
