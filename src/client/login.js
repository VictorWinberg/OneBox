import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Control, actions } from "react-redux-form";

const show = bool => ({ display: bool ? "block" : "none" });

class Login extends Component {
  componentDidMount() {
    const { dispatch, history, socket } = this.props;

    socket.on("login", data => {
      dispatch(actions.change("forms.login.color", data.color));
      history.push("/");
    });
  }

  render() {
    const { dispatch, page, socket } = this.props;
    return (
      <Form
        model="forms.login"
        className="form"
        onSubmit={vals => {
          switch (page) {
            case "GET_USERNAME":
              return dispatch({ type: "SET_PAGE", page: "GET_ROOM_CODE" });
            case "GET_ROOM_CODE":
              const { username, room } = vals;
              if (username && room) {
                socket.emit("add user", username, room);
                dispatch({ type: "SET_PAGE", page: "LOGGED_IN" });
              }
              return;
            default:
              return;
          }
        }}
      >
        <button type="submit" style={{ display: "none" }} />
        <ul className="pages">
          <li
            className="login page"
            style={show(page === "GET_USERNAME" || page === "GET_ROOM_CODE")}
          >
            <div className="form">
              <div
                className="enter-username"
                style={show(page === "GET_USERNAME")}
              >
                <h3 className="title">What's your nickname?</h3>
                <Control.text
                  model="forms.login.username"
                  className="usernameInput"
                  type="text"
                  autoFocus={page === "GET_USERNAME"}
                  maxLength="14"
                />
              </div>
              <div
                className="enter-room"
                style={show(page === "GET_ROOM_CODE")}
              >
                <h3 className="title">What's the room code?</h3>
                <Control.text
                  model="forms.login.room"
                  className="roomInput"
                  type="text"
                  autoFocus={page === "GET_ROOM_CODE"}
                  maxLength="14"
                />
              </div>
            </div>
          </li>
        </ul>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
  socket: state.socket
});

export default connect(mapStateToProps)(Login);
