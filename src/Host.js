import React from "react";

const Host = () => (
  <ul class="pages">
    <li class="login page">
      <div class="form">
        <div>
          <h3 class="title">The room code:</h3>
          <input class="roomInput" type="text" maxlength="14" />
        </div>
        <br />
        <div class="participants">
          <ul />
        </div>
      </div>
    </li>
  </ul>
);

export default Host;
