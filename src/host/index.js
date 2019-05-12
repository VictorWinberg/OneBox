import React from "react";

const Host = () => (
  <ul className="pages">
    <li className="login page">
      <div className="form">
        <div>
          <h3 className="title">The room code:</h3>
          <input className="roomInput" type="text" maxLength="14" />
        </div>
        <br />
        <div className="participants">
          <ul />
        </div>
      </div>
    </li>
  </ul>
);

export default Host;
