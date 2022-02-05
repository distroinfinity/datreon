import React, { Component } from "react";
import Identicon from "identicon.js";
import Add from "./add";
import MediaCard from "./postcard";
import ArtistCard from "./artistCard";

function Main(props) {
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

            <p>&nbsp;</p>

            {/* Code ... */}

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
        <div>
          <p>&nbsp;</p>
          {props.artists.map((artist, key) => {
            return (
              <>
                <ArtistCard artist={artist} />
                <p>&nbsp;</p>
              </>
            );
          })}
        </div>
        {/* </main> */}
      </div>
    </div>
  );
}

export default Main;
