import { Client } from 'boardgame.io/react';
import { fiftysix } from './Game';
import { fiftysixBoard} from './Board';

const App = Client({ 
	game: fiftysix,
	board:fiftysixBoard});

export default App;