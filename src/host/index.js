import React from "react";

import { createRoom } from "./actions";

const Host = () => (
  <ul className="pages">
    <li className="login page">
      <div className="form">
        <div>
          <h3 className="title">The room code:</h3>
          <input
            readOnly
            className="roomInput"
            type="text"
            maxLength="14"
            value={createRoom()}
          />
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
