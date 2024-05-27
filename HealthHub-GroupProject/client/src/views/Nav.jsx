import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useLocation } from "react-router-dom";
import Logout from "../components/Logout";

export default function ButtonAppBar() {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-center">
          <div className="flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              className="mr-2"
            ></IconButton>
            <a href="/home">
              <Typography variant="h6" component="div" className="flex-grow">
                HealthHub
              </Typography>
            </a>
          </div>
          <Button color="inherit" className="mt-0">
            <Logout className="mt-0" />
          </Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
