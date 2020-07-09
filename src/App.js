import { Client } from 'boardgame.io/react';
import { fiftysix } from './Game';
import { fiftysixBoard} from './NewBoard';
import { Local } from 'boardgame.io/multiplayer';

const App = Client({ 
	game: fiftysix,
	board:fiftysixBoard,
	multiplayer: Local()}
);

export default App;