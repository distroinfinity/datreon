import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import photo from "../photo.png";
import Identicon from "identicon.js";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    paddingLeft: "10px",
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <div style={{ display: "flex" }}>
          <img
            src={photo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          <Typography variant="h6" className={classes.logoLg}>
            DAtreon
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div id="account" style={{ padding: "10px" }}>
            {"0x0"}
          </div>

          {props.account ? (
            <img
              width="30"
              height="30"
              src={`data:image/png;base64,${new Identicon(
                props.account,
                30
              ).toString()}`}
            />
          ) : (
            <span></span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
