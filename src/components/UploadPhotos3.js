import React, { Component }  from 'react';
import {Link} from 'react-router-dom';

function UploadPhotos3(){
    return(
        <div>
            <div>
                <h3>Upload one photo per field</h3>
            </div>
            <div>
                <button>Reading Room</button><br></br>
                <button>3D Tour</button><br></br>
               
                <button><Link to="/Dashboard">Back To Dasboard</Link></button><br></br>
            </div>
        </div>
    );
}
export default UploadPhotos3;