import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../customHooks/hooks";
import { logoutTC } from "../../features/Login/auth-slice";

const ButtonAppBar = () => {
  const isLoggedIn = useAppSelector((s) => s.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutTC());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          {isLoggedIn && (
            <Button onClick={logoutHandler} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
