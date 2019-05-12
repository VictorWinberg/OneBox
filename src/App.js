import React from "react";

function App() {
  return (
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <ul class="messages" />
        </div>
        <input class="inputMessage" placeholder="Type here..." />
      </li>
      <li class="login page">
        <div class="form">
          <div class="enter-username">
            <h3 class="title">What's your nickname?</h3>
            <input class="usernameInput" type="text" maxlength="14" />
          </div>
          <div class="enter-room">
            <h3 class="title">What's the room code?</h3>
            <input class="roomInput" type="text" maxlength="14" />
          </div>
        </div>
      </li>
    </ul>
  );
}

export default App;
