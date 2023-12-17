import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
 
  const isLoggedIn = sessionStorage.getItem("token")!=null;
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    navigate("/");
    
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URC
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Déconnexion
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Connexion
            </Button>
            <Button color="inherit" component={Link} to="/inscription">
              Inscription
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
