import { INVALID_MOVE } from 'boardgame.io/core';

export const fiftysix = {
  setup: () => ({ 
  	//cells: Array().fill(null),
  	points: [12,12],
	gamesPlayed: 0,
	nextPlayer: 0,
	numOfPlayers: 6,
	hands: getRandomHand(6),
	bidValue: '',
	trump: '',
	double: '',
	doublerId: '',
	redouble: '',
	redoublerId: '',
	bidderId: '',
	bids: [],
	disallowedBidders: [],
	cardsPlayed: []
  }),

  moves: {
  
	bidTrump:  (G,ctx,bidString) => {
		if(isValidBid(G,ctx,bidString)){
			let bidValue = Number(bidString.slice(0,2))
			let trump=bidString[2]
			let double=Number(bidString[4])
			let redouble=Number(bidString[5])
			let pass=Number(bidString[6])
			let plus=Number(bidString[7])
			let plusValue=Number(bidString[8])
			let bidderId=bidString[9] 

			if (pass !== 0){
				if(plus === 1){
					G.bidValue = G.bidValue + plusValue
					G.trump = trump
					G.bidderId =bidderId
					G.double =''
					G.doublerId=''
				}
				if (double === 1){
					G.double =1
					G.doublerId=bidderId
				}
				if(redouble === 1){
					G.redouble =1
					G.redoublerId =bidderId
				}
				if(bidValue >28){
					G.bidValue = bidValue
					G.trump = trump
					G.double=''
					G.doublerId=''
				}
			}
			G.bids.push(bidString)
		}else
			return INVALID_MOVE
	},
    
	playCard:  (G,ctx,cardPlayed) => {
	if(isValidPlay(G,ctx,cardPlayed)){
		G.cardPlayed.push(cardPlayed)
		G.nextplayer = findNextPlayer(G,ctx)
		removeCard(cardPlayed)
	}
	else
		return INVALID_MOVE
	}    
  }
};

function isValidBid(G,ctx,bidString){

	if(G.redouble === '1')
		return false;

	if(bidString.length !==  10)
		return false;

	let bidValue = Number(bidString.slice(0,2))
	let trump=bidString[2]
	let reverse=Number(bidString[3])
	let double=Number(bidString[4])
	let redouble=Number(bidString[5])
	let pass=Number(bidString[6])
	let plus=Number(bidString[7])
	let plusValue=Number(bidString[8])
	let bidderId=bidString[9] 

	let bidderOkay = 1;
	for ( let i=0; i<G.disallowedBidders.length; i++){
		if(G.disallowedBidders[i] === bidderId){
			bidderOkay = 0
			break; 
		}
		
	}

	if ((bidValue>0  && bidValue<28) || bidValue>56)
		return false;

	if ((trump !== 'N') && (trump !=='O') && (trump !=='C') && (trump !=='D') && (trump !=='H') && (trump !=='S'))
		return false;

	if (reverse+double+redouble+pass+plus >1)
		return false;

	if (plusValue>8) 
		return false;

	if (bidderId <0 || bidderId >= G.numOfPlayers)
		return false; 


	// Is the bid either Staight or reverse?

	if ((bidValue>0) && (double+redouble+pass+plus+plusValue) === 0  && (G.bidValue < bidValue )  && bidderOkay === 1 )
		return  true ;

	//Is the bid a double?

	let okayToDouble =((G.bidderId -bidderId)%2 === 1) && (double === 1)

	if(bidValue === 0 && trump === 'U' && okayToDouble && (reverse+double+redouble+pass+plus+plusValue) === 1 && G.bidValue !== ''  )
		return true ;

	//Is the bid a redouble?
	let okayToRedouble =((G.doublerId -bidderId)%2 === 1) && (double === 1) && G.double === 1

	if(bidValue === 0 && trump === 'U' && okayToRedouble === 1 && (reverse+double+redouble+pass+plus+plusValue) === 1 )
		return true;

	//Is the bid a pass?
	if(bidValue === 0 && trump === 'U' && pass === 1  && (reverse+double+redouble+pass+plus+plusValue) === 1 && G.bidValue !== '')
		return true;


	//Is the bid a plus bid?

	let isTrumpBid = ( trump === 'C' || trump === 'D'|| trump ===' H'|| trump === 'S')
	if (bidValue === 0 && isTrumpBid && plus === 1 && plusValue >0 && bidderOkay === 1 &&  reverse+double+redouble+pass === 0  && (G.bidValue + plusValue) < 57 )
		return true;

	return true;
}

function isValidPlay(G,ctx,cardPlayed){
	return true;
}

function findNextPlayer(G,ctx){
	return 0;

}

function getRandomHand(numOfPlayers){
	let ranks = ['J', '9', 'A', '10', 'Q', 'K']
	if (numOfPlayers === 8){
		ranks.push(8)
		ranks.push(7)
	}
    let cards = [].concat(...ranks.map(d => ['♣️', '♦️', '♥️', '♠'].map(e => "".concat(d, e))))
    cards = [].concat(...new Array(2).fill(cards)).sort( () => Math.random() - 0.5).sort( () => Math.random() - 0.5)
    let hand = []
  	for (let i = 0; i < numOfPlayers; i++) {
  		hand.push(cards.slice(i*8, (i+1)*8))
    }
    return hand;
}

function removeCard(cardPlayed){

}