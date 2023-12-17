import React, { useState } from 'react';
import { loginUser } from './loginApi';
import { Session } from '../model/common';
import { CustomError } from '../model/CustomError';
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../principal/navBar';

export function Login() {
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as Session);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    
    loginUser(
      { user_id: -1, username: data.get('login') as string, password: data.get('password') as string },
      (result: Session) => {
        console.log(result);
        setSession(result);
        form.reset();
        setError(new CustomError(''));

        // Redirect to the "Messages" page after successful login
        navigate('/messages');
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError(loginError);
        setSession({} as Session);
      }
    );
  };

  return (
    <div>
      <NavBar/>
    <Container component="main" maxWidth="xs" sx={{ mt: '10rem' }}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5" fontWeight={'bold'} textAlign={'center'}>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField id="login" label="Login" name="login" variant="standard" margin="normal" required fullWidth />
          <TextField
            id="password"
            label="Password"
            name="password"
            variant="standard"
            type="password"
            margin="normal"
            required
            fullWidth
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Connexion
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
    </div>
  );
}
 