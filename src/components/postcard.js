import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Identicon from "identicon.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    // height: 240,
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className="card-header">
          <img
            className="mr-2"
            width="30"
            height="30"
            src={`data:image/png;base64,${new Identicon(
              props.image.author,
              30
            ).toString()}`}
          />
          <small className="text-muted">{props.image.author}</small>
        </div>
        <CardMedia
          className={classes.media}
          image={`https://ipfs.infura.io/ipfs/${props.image.hash}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            TITLE
          </Typography>
          <Typography variant="body2" component="p">
            {props.image.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", alignItems: "baseline", justifyContent:"space-between"}}>
        <Button
          size="small"
          color="primary"
          name={props.image.id}
          onClick={(event) => {
            let tipAmount = window.web3.utils.toWei("0.1", "Ether");
            console.log(props.image.id, tipAmount);
            props.tipImageOwner(props.image.id, tipAmount);
          }}
        >
          TIP 0.1 ETH
        </Button>
        <small className="float-left mt-1 text-muted">
          Total donations:{" "}
          {window.web3.utils.fromWei(props.image.tipAmount.toString(), "Ether")}{" "}
          ETH
        </small>
      </CardActions>
    </Card>
  );
}
