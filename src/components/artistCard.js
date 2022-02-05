import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Identicon from "identicon.js";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
    height: 100,
  },
}));

export default function ArtistCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.artist}
          </Typography>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Support Button
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<MonetizationOnIcon />}
          >
            Support
          </Button>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`data:image/png;base64,${new Identicon(
          props.artist,
          150
        ).toString()}`}
        title="Live from space album cover"
      />
    </Card>
  );
}
