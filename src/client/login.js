import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Control, actions } from "react-redux-form";

const show = bool => ({ display: bool ? "block" : "none" });

class Login extends Component {
  constructor() {
    super();
    this.state = {
      status: "GET_USERNAME"
    };
  }

  componentDidMount() {
    const { dispatch, history, socket } = this.props;

    socket.on("login", data => {
      dispatch(actions.change("forms.login.color", data.color));
      history.push("/");
    });
  }

  render() {
    const { status } = this.state;
    const { socket } = this.props;
    return (
      <Form
        model="forms.login"
        className="form"
        onSubmit={vals => {
          switch (status) {
            case "GET_USERNAME":
              return this.setState({ status: "GET_ROOM_CODE" });
            case "GET_ROOM_CODE":
              const { username, room } = vals;
              if (username && room) {
                socket.emit("add user", username, room);
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
            style={show(
              status === "GET_USERNAME" || status === "GET_ROOM_CODE"
            )}
          >
            <div className="form">
              <div
                className="enter-username"
                style={show(status === "GET_USERNAME")}
              >
                <h3 className="title">What's your nickname?</h3>
                <Control.text
                  model="forms.login.username"
                  className="usernameInput"
                  type="text"
                  autoFocus={status === "GET_USERNAME"}
                  maxLength="14"
                />
              </div>
              <div
                className="enter-room"
                style={show(status === "GET_ROOM_CODE")}
              >
                <h3 className="title">What's the room code?</h3>
                <Control.text
                  model="forms.login.room"
                  className="roomInput"
                  type="text"
                  autoFocus={status === "GET_ROOM_CODE"}
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
  socket: state.socket
});

export default connect(mapStateToProps)(Login);
