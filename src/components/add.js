import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 50,
    right: 50,
  },
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
    //   padding: "10px",
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Add(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");

  return (
    <>
      <Tooltip title="Add Post" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Title"
                size="small"
                style={{ width: "100%" }}
                value={title}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setTitle(event.target.value);
                }}
                required
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Tell your story..."
                variant="outlined"
                label="Caption"
                size="small"
                style={{ width: "100%" }}
                value={description}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setDescription(event.target.value);
                }}
                required
              />
            </div>

            <div className={classes.item}>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif"
                onChange={props.captureFile}
                required
              />
            </div>

            {/* <div className={classes.item}> */}
            {/* <TextField select label="Visibility" value="Public">
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Unlisted">Unlisted</MenuItem>
              </TextField> */}
            {/* </div> */}
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                onClick={() => {
                  console.log("uploading");
                  props.uploadImage(title, description);
                  setOpenAlert(true);
                  setOpen(false);
                }}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          Posted successfully! Wait for image to be uploaded to ipfs.
        </Alert>
      </Snackbar>
    </>
  );
}
