import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Control, actions } from "react-redux-form";

class Client extends Component {
  constructor() {
    super();
    this.state = { messages: [] };
  }

  componentDidMount() {
    const { page, history, socket, login } = this.props;

    if (page !== "LOGGED_IN") {
      return history.push("/login");
    }

    socket.on("new message", data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on("user joined", data => {
      console.log(data.username + " joined");
      this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on("user left", data => {
      console.log(data.username + " left");
      this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on("disconnect", () => console.log("disconnected"));
    socket.on("reconnect", () => {
      console.log("reconnected");
      const { username, room } = login;
      if (username && room) {
        socket.emit("add user", username, room);
      }
    });
    socket.on("reconnect_error", () => console.log("reconnect failed"));
  }

  render() {
    const { messages } = this.state;
    const { dispatch, socket, login } = this.props;
    const { username, color } = login;

    return (
      <Form
        model="forms.data"
        className="form"
        onSubmit={({ message }) => {
          this.setState({
            messages: [...this.state.messages, { username, color, message }]
          });
          socket.emit("new message", message);
          dispatch(actions.reset("forms.data"));
        }}
      >
        <button type="submit" style={{ display: "none" }} />
        <ul className="pages">
          <li className="login chat page">
            <div className="chatArea">
              <ul className="messages">
                {messages.map(({ username, color, message }, idx) => (
                  <li
                    key={idx}
                    className="message"
                    style={{ display: "list-item" }}
                  >
                    <span className="username" style={{ color }}>
                      {username}
                    </span>
                    <span className="messageBody" style={{ color: "white" }}>
                      {message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Control.text
              model="forms.data.message"
              className="inputMessage"
              autoFocus
              type="text"
              placeholder="Type here..."
              maxLength="14"
              style={{ color: "black" }}
            />
          </li>
        </ul>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
  socket: state.socket,
  login: state.forms.login
});

export default connect(mapStateToProps)(Client);
