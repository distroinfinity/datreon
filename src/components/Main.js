import React, { useState } from "react";
import Identicon from "identicon.js";
import Add from "./add";
import MediaCard from "./postcard";
import ArtistCard from "./artistCard";
import SearchBar from "material-ui-search-bar";
import Typography from "@material-ui/core/Typography";

function Main(props) {
  const [searchField, setSearchField] = useState("");

  return (
    <div className="container-fluid mt-5">
      {/* display: flex;
    flex-wrap: nowrap;
    margin-right: -15px;
    margin-left: -15px;
    flex-direction: row; */}

      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <Add
              captureFile={props.captureFile}
              uploadImage={props.uploadImage}
            />

            {/* Code ... */}
            <Typography variant="h2" gutterBottom>
              Featured Artwork
            </Typography>
            {/* <p>&nbsp;</p> */}
            {props.images.map((image, key) => {
              return (
                <>
                  <MediaCard
                    image={image}
                    tipImageOwner={props.tipImageOwner}
                  />
                  <p>&nbsp;</p>
                </>
              );
            })}
          </div>
        </main>
        {/* <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "300px" }}
        > */}
        <div style={{ paddingRight: "100px" }}>
          <p>&nbsp;</p>
          <SearchBar
            placeholder="Find a creator you love"
            value={searchField}
            onChange={(newValue) => setSearchField(newValue)}
            onRequestSearch={() => {
              console.log(searchField);
            }}
          />
          <p>&nbsp;</p>
          {searchField.length == 0 ? (
            <p>Support your favourite creators</p>
          ) : (
            ""
          )}
          {/* <p>&nbsp;</p> */}
          {props.artists.map((artist, key) => {
            if (searchField != "") {
              if (artist == searchField) {
                return (
                  <>
                    <ArtistCard
                      artist={artist}
                      donateToAuthor={props.donateToAuthor}
                    />
                    <p>&nbsp;</p>
                  </>
                );
              }
            } else {
              return (
                <>
                  <ArtistCard
                    artist={artist}
                    donateToAuthor={props.donateToAuthor}
                  />
                  <p>&nbsp;</p>
                </>
              );
            }
          })}
        </div>
        {/* </main> */}
      </div>
    </div>
  );
}

export default Main;
