
import {bidTrump,playCard} from './moves.js'

export const fiftysix = {
  setup: () => ({ 
  	//cells: Array().fill(null),
  	message:'',
  	bids: [],
  	points: [12,12],
	gamesPlayed: 0,
	nextPlayer: 0,
	numPlayers: 6,
	hands: getRandomHand(6),
	bid: {
		bidder: '',
		value: 27,
		trump: '',
		doubler: '',
		redoubler: '',
		bidCount: 0,
		passCount: 0
	},
	disallowedBidders: [],
	cardsPlayed: []
  }),

  turn: {
    moveLimit: 1,
  },

  phases: {
  	biddingPhase:{
  		moves: {bidTrump},
  		endIf : (G,ctx) => {
  			if((G.bid.redoubler !== '')||(G.bid.passCount === G.numPlayers))
  				return true
  			return false
  		},
  		onEnd: (G, ctx ) => { G.message = "About to start Playing Phase"},
  		next: 'playingPhase',
  		start: true
  	},

  	playingPhase:{
  		moves: {playCard}
  	}
  },

  moves: {
	bidTrump,
	playCard  
  }
};



function getRandomHand(numPlayers){
	let ranks = ['J', '9', 'A', '10', 'Q', 'K']
	if (numPlayers === 8){
		ranks.push(8)
		ranks.push(7)
	}
    let cards = [].concat(...ranks.map(d => ['♣️', '♦️', '♥️', '♠'].map(e => "".concat(d, e))))
    cards = [].concat(...new Array(2).fill(cards)).sort( () => Math.random() - 0.5).sort( () => Math.random() - 0.5)
    let hand = []
  	for (let i = 0; i < numPlayers; i++) {
  		hand.push(cards.slice(i*8, (i+1)*8))
    }
    return hand;
}
