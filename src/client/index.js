import React from "react";
import { connect } from "react-redux";
import { Form, Control } from "react-redux-form";

const show = bool => ({ display: bool ? "block" : "none" });

const Client = ({ dispatch, count }) => (
  <Form
    model="data"
    className="form"
    onSubmit={() => dispatch({ type: "INC" })}
  >
    <button type="submit" style={{ display: "none" }} />
    <ul className="pages">
      <li className="login page" style={show(count < 2)}>
        <div className="form">
          <div className="enter-username" style={show(count === 0)}>
            <h3 className="title">What's your nickname?</h3>
            <Control.text
              model="data.username"
              className="usernameInput"
              type="text"
              autoFocus={count === 0}
              maxLength="14"
            />
          </div>
          <div className="enter-room" style={show(count === 1)}>
            <h3 className="title">What's the room code?</h3>
            <Control.text
              model="data.room"
              className="roomInput"
              type="text"
              autoFocus={count === 1}
              maxLength="14"
            />
          </div>
        </div>
      </li>
      <li className="chat page" style={show(count >= 2)}>
        <div className="chatArea">
          <ul className="messages" />
        </div>
        <Control.text
          model="data.message"
          className="inputMessage"
          placeholder="Type here..."
          type="text"
          autoFocus={count >= 2}
        />
      </li>
    </ul>
  </Form>
);

const mapStateToProps = state => ({
  count: state.counter
});

export default connect(mapStateToProps)(Client);
