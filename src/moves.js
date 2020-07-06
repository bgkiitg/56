import { INVALID_MOVE } from 'boardgame.io/core';

export const bidTrump = (G,ctx,bidString) => {
	let bidType = identifyBid(G,ctx,bidString)
	console.log(bidString, bidType)
	if(bidType >0){
		G.bid.bidCount++
		G.bids.push(bidString)
		if(G.bidType > 1)
			G.bid.passCount =0
	}
	//Rework to incorporate the starting player		
	switch(identifyBid(G,ctx,bidString)) {
		case 0:
			return INVALID_MOVE
		case 1:
			G.bid.passCount++
			break;
		case 2:
			G.bid.doubler = ctx.currentPlayer
			break;
		case 3:
			G.bid.redoubler = ctx.currentPlayer
			break;
		case 4:
			G.bid.bidder = ctx.currentPlayer
			G.bid.value = Number(bidString.slice(0,2))
			G.bid.trump = bidString[2]
			G.bid.doubler =''
			G.bid.redoubler= ''
			break;
		case 5:
			G.bid.bidder = ctx.currentPlayer
			G.bid.value = Number(bidString[1])+G.bid.value
			G.bid.trump = bidString[2]
			G.bid.doubler =''
			G.bid.redoubler= ''
			break;
		case 6:
			G.bid.bidder = ctx.currentPlayer
			G.bid.value = Number(bidString.slice(1,3))
			G.bid.trump = bidString[0]
			G.bid.doubler =''
			G.bid.redoubler= ''
			break;
		case 7:
			G.bid.bidder = ctx.currentPlayer
			G.bid.value = Number(bidString.slice(0,2))
			G.bid.trump = bidString.slice(2,4)
			G.bid.doubler =''
			G.bid.redoubler= ''
			break;
		case 8:
			G.bid.bidder = ctx.currentPlayer
			G.bid.value = Number(bidString.slice(0,2))
			G.bid.trump = bidString.slice(2,4)
			G.bid.doubler =''
			G.bid.redoubler= ''
			break;
		default :
			return INVALID_MOVE
	}
	if(G.bid.bidCount ===  G.numPlayers + 80000){
		setUpDisallowedBidders(G,ctx)
	}

}

	
export const playCard =  (G,ctx,cardPlayed) => {
	if(isValidPlay(G,ctx,cardPlayed)){	
		G.cardsPlayed.push(cardPlayed)
		removeCard(G,ctx,cardPlayed,G.nextPlayer)
		G.nextPlayer = (G.nextPlayer+ 1)%6
		G.messages = "The next player is"+ G.nextPlayer
	
	}
	else
		return INVALID_MOVE
}



function isValidPlay(G,ctx,cardPlayed){
	if(G.hands[G.nextPlayer].includes(cardPlayed))
		return true;
}

function findNextPlayer(G,ctx) {
	return 0;
}



function identifyBid(G,ctx,bidString){
	// The return values reflect the following
	// 0 : Invalid Bid
	// 1 : Pass
	// 2 : Double
	// 3 : Redouble
	// 4 : Straight Bid 
	// 5 : Plus Bid
	// 6 : Reverse Bid
	// 7 : NS
	// 8 : NT
	//No valid bids after redoubling
	if(G.bid.redoubler !== '' )
		return 0
	if(G.bid.passCount === G.numPlayers)
		return 0
	console.log(bidString)
	switch(bidString) {
		case "Pass":
			console.log("Pass")
			if(G.bid.bidder === '')
				return 0
			else
				return 1
		case "Double":
			console.log("Double")
			if((G.bid.bidder === '')  || (Math.abs(G.bid.bidder - ctx.currentPlayer))%2 === 0)
				return 0
			else 
				return 2

		case "Redouble":
			console.log("Redouble")
			if((G.bid.doubler === '') || (Math.abs(G.bid.doubler - ctx.currentPlayer))%2 ===0)
				return 0
			else 
				return 3

		default :
			switch(bidString.length){
				case 3:
					console.log("Straight Reverse or Plus")
					if(bidString[1] === '+') return 0  //Disallow reverse bids
					if(bidString[0]==='C' || bidString[0]==='D' || bidString[0]==='H' ||bidString[0]==='S' ){

						if(Number(bidString.slice(1,3)) > G.bid.value && Number(bidString.slice(1,3)) <57)	return 6
					}
					if(bidString[0] === '+'){
						let x= Number(bidString[1])
						if( x >0 && x <9 && G.bid.value + x < 57){ return 5} else {return 0}
					}
					if(bidString[2]==='C' || bidString[2]==='D' || bidString[2]==='H' ||bidString[2]==='S' ){
						if(Number(bidString.slice(0,2)) > G.bid.value && Number(bidString.slice(0,2)) <57)	return 4
					}
					return 0
				case 4:
					if(bidString.slice(2,4) === 'NS'){
						if(Number(bidString.slice(0,2)) > G.bid.value && Number(bidString.slice(0,2)) <57)	return 7
					}
					if(bidString.slice(2,4) === 'NT'){
						if(Number(bidString.slice(0,2)) > G.bid.value && Number(bidString.slice(0,2)) <57)	return 8
					}
					break ;
				default:
					return 0

			}	
	}
}


//DEbug Thus
function setUpDisallowedBidders(G,ctx){
	let evenTeamBid = 0
	for(let i =1; i <G.numPlayers; i+2){
		if(G.bids[i] !== 'Pass'){
			evenTeamBid = 1
			break;
		}
	}


	let oddTeamBid = 0
	for(let i =2; i <G.numPlayers; i+2){
		if(G.bids[i] !== 'Pass'){
			oddTeamBid = 1
			break;
		}
	}
	if (evenTeamBid === 0)
		G.disallowedBidders = (ctx.currentPlayer%2 === 1) ? [1,3,5,7] : [2,4,6,8]

	let temp = []
	if (oddTeamBid === 0){
	
		let tempPlayer = (ctx.currentPlayer+3)%G.numPlayers
		for(let i = 1; i< G.numPlayers; i+2){
			temp.push(tempPlayer)
			tempPlayer = tempPlayer+ 2
		}
	}
	G.disallowedBidders = G.disallowedBidders.concat(temp)
}


function removeCard(G,ctx,cardPlayed,player){
	const arr=[]
	for(let i=0;i<G.hands[player].length;i++){
		if(G.hands[player][i] !==cardPlayed){
			arr.push(G.hands[player][i])
		}
	}
	console.log(arr)
	G.hands[player]=arr
}