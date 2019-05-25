import React from "react";
import { connect } from "react-redux";
import { Form, Control } from "react-redux-form";

const show = bool => ({ display: bool ? "block" : "none" });

const Client = ({ dispatch, page, state }) => (
  <Form
    model="forms.data"
    className="form"
    onSubmit={(vals, a, b) => {
      switch (page) {
        case "USERNAME":
          return dispatch({ type: "SET_PAGE", payload: "ROOM_CODE" });
        case "ROOM_CODE":
          // CHANGE VIEW
          console.log(vals);

          return dispatch({ type: "SET_PAGE", payload: "CHAT_PAGE" });
        default:
          return;
      }
    }}
  >
    <button type="submit" style={{ display: "none" }} />
    <ul className="pages">
      <li
        className="login page"
        style={show(page === "USERNAME" || page === "ROOM_CODE")}
      >
        <div className="form">
          <div className="enter-username" style={show(page === "USERNAME")}>
            <h3 className="title">What's your nickname?</h3>
            <Control.text
              model="forms.data.username"
              className="usernameInput"
              type="text"
              autoFocus={page === "USERNAME"}
              maxLength="14"
            />
          </div>
          <div className="enter-room" style={show(page === "ROOM_CODE")}>
            <h3 className="title">What's the room code?</h3>
            <Control.text
              model="forms.data.room"
              className="roomInput"
              type="text"
              autoFocus={page === "ROOM_CODE"}
              maxLength="14"
            />
          </div>
        </div>
      </li>
      <li className="chat page" style={show(page === "CHAT_PAGE")}>
        <div className="chatArea">
          <ul className="messages" />
        </div>
        <Control.text
          model="data.message"
          className="inputMessage"
          placeholder="Type here..."
          type="text"
          autoFocus={page === "CHAT_PAGE"}
        />
      </li>
    </ul>
  </Form>
);

const mapStateToProps = state => ({
  page: state.page,
  state: state
});

export default connect(mapStateToProps)(Client);
