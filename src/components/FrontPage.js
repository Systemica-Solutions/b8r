import React, { Component } from "react";
import "./FrontPage.css";

import { Link } from "react-router-dom";
// Login/Sign-up

function FrontPage() {
  return (
    <div>
      <div className="container">
        <div className="logo">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAdRJREFUaEPtmX1uwjAMxc3Jxk62cbKxk216Uy1lbRI/O05LpfYfELj0/eLPhJuc/LqdXL9cAEd7cKYHPhe4NxF5iMhzBuwsgLuIfK0EA0Kh0lhmANTEq+D3bE9kA/TET4HIBkDYAKJ3IRfgiZQrE4ARr6LTILIAPOIVIiWpMwBQWT6C8TAMMQowIj7FEyMAGeKHIaIAmeKHICIATK0PpsTfyOHq1l6AmeJDjc4DsId4N4QHIFLro6FENzoWYE/xrm7NABwhnq5MFsCMcukNq25l6gG8gnjTEy2AVxLfhagB7Fkuh8OpBnBk0jJA/zTXAH6YXznIZtMfagCIfxyFWFvDsl5/B/YEeszCPgfP2xwKWGW0XOi1Z9blzZP45b0KsD6GobRRRguFBQAzJn9qY0INntJGGTUA8LG3CLRmnFreUdooow5Aq0siLHSfjPcQjjypzfqt0KO0UUYdAHzl3oQUidXLG0obZWQARCGspKe0UUYEAEzoGX4JJesohtJGGZEAZV9AWCkUXpEHWi4t4fo7lDbKyAmQ1aQpbZTRBRDzCbW4lNHlgcsD7RXwhBAzqMXWensX3VM8ADrfeOb3CBDE03/LegAiYqbfcwFMX2LjAaf3wC8hBV4xhWfHvgAAAABJRU5ErkJggg=="/>
      </div>
        <div>
        <Link to="/FrontLogin"> <button className="bold btn-signup"> Log-in </button> </Link>
        </div> 
        <div>
        <Link to="/SignUp">  <button className="bold btn-signup">Sign-up</button> </Link>
        </div>

      </div>
    </div>
  );
}

export default FrontPage;
