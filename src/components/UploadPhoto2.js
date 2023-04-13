import React, { Component } from "react";
import { Link } from "react-router-dom";

function UploadPhoto2() {
  return (
    <div>
      <div>
        <h3>Upload one photo per field</h3>
      </div>
      <div>
        <h4>Utility Area</h4>
        <input
          type="file"
          name="file"
          id="input-files"
          class="form-control-file border"
        />
        <br></br>
        <h4>Bedroom 1</h4>
        <br></br>
        <h4>Bedroom 2</h4>
        <br></br>
        <h4>Attach Bathroom 1</h4>
        <br></br>
        <h4>Attach Bathroom 2</h4>
        <br></br>
        <h4>Balcony</h4>
        <br></br>

        <button style={{  fontWeight: "900" }}>
          <Link to="/UploadPhotos3">Next</Link>
        </button>
        <br></br>
      </div>
    </div>
  );
}
export default UploadPhoto2;
