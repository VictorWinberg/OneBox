import React, { Component } from "react";
import { connect } from "react-redux";

import { createRoom, rejoinRoom } from "./actions";

class Host extends Component {
  constructor() {
    super();
    this.state = {
      room: "",
      users: []
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    const room = createRoom(socket);
    this.setState({ room });

    socket.on("user joined", data => {
      console.log(data.username + " joined");
      this.setState({ users: [...this.state.users, data] });
    });

    socket.on("user left", data => {
      console.log(data.username + " left");
      this.setState({
        users: this.state.users.filter(user => user.username !== data.username)
      });
    });

    socket.on("disconnect", () => console.log("disconnected"));
    socket.on("reconnect", () => {
      rejoinRoom(socket, room);
      console.log("reconnected");
    });
    socket.on("reconnect_error", () => console.log("reconnect failed"));
  }

  render() {
    const { room, users } = this.state;
    return (
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
                value={room}
              />
            </div>
            <br />
            <div className="participants">
              <ul>
                {users.map(({ username, color }) => (
                  <li key={username} style={{ color }}>
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket
});

export default connect(mapStateToProps)(Host);
