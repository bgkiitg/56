export const bidTrump:  (G,ctx,bidString) => {
	let bidType = identifyBid(G,ctx,bidString)
	console.log(bidString, bidType)
	if(bidType >0){
		G.bid.bidCount++
		G.bids.push(bidString)
		if(bidType>1){G.bid.passCount = 0}
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
	if(G.bid.bidCount ===  6){
		setUpDisallowedBidders(G,ctx)
	}
}
    