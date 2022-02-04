import React, { Component } from "react";
import Identicon from "identicon.js";
import Add from "./add";
import MediaCard from "./postcard";
function Main(props) {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
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
                  <MediaCard image={image} />
                  <p>&nbsp;</p>
                </>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
