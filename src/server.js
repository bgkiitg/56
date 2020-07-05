const { Server } = require('boardgame.io/server');
const { fiftysix } = require('./Game');

const server = Server({ games: [fiftysix] });

server.run(8000);