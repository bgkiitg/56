import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { fiftysix } from './Game';
import { fiftysixBoard} from './NewBoard';

const FiftysixClient = Client({
  game: fiftysix,
  board: fiftysixBoard,
  debug: true,
  numPlayers: 6,
  multiplayer: SocketIO({ server: "localhost:8000" })
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Player 2
          </button>
          <button onClick={() => this.setState({ playerID: "3" })}>
            Player 3
          </button>
          <button onClick={() => this.setState({ playerID: "4" })}>
            Player 4
          </button>
          <button onClick={() => this.setState({ playerID: "5" })}>
            Player 5
          </button>
        </div>
      );
    }
    return (
      <div>
        <FiftysixClient playerID={this.state.playerID} />
      </div>
    );
  }
}

class App1 extends React.Component {
  state = { playerID: null };

  render() {
    return (
      <>
      <div>
        <h1> Player 0 </h1>
        <FiftysixClient playerID="0" />
      </div>
      <div>
        <h1> Player 1 </h1>
        <FiftysixClient playerID="1" />
      </div>
      <div>
        <h1> Player 2 </h1>
        <FiftysixClient playerID="2" />
      </div>
      <div>
        <h1> Player 3 </h1>
        <FiftysixClient playerID="3" />
      </div>
      <div>
        <h1> Player 4 </h1>
        <FiftysixClient playerID="4" />
      </div>
      <div>
        <h1> Player 5 </h1>
        <FiftysixClient playerID="5" />
      </div>
      </>
    );
  }
}

render(<App />, document.getElementById("root"));
