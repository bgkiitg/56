import React from 'react';
import {cellStyle, cellEmpty} from './styles.js'

export class fiftysixBoard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      value : '',
      playerID: '',
      trump: '',
      double: '',
      redouble: '',
      reverse: 0,
      pass:'',
      card:''
	 }

  }


  displayFiftySixGame() {
  	if(this.props.ctx.phase === 'biddingPhase')
  		return this.biddingPhaseView()
  	if(this.props.ctx.phase === 'playingPhase')
  		return this.playingPhaseView()
  }

 displayBid(){
      if(this.state.double === 1)
        return "Double"
      if(this.state.redouble === 1)
        return "Redouble"
      if(this.state.pass === 1)
        return "Pass"
      if(this.state.reverse === 1)
        return this.state.trump + this.state.value
      return this.state.value + this.state.trump
    }

  handleClick(j){
    if(j === 'C' || j === 'D' || j === 'H' || j === 'S' || j === 'NT' || j === 'NS'){
      this.setState({trump: j, double: '', redouble: '', pass:''})
    }
    if(j === 'X' || j ==='XX' || j === 'Pass'){
      this.setState({value: '', trump: '', double: '', redouble: '', reverse: 0, pass: ''})
      if(j=== 'X'){ this.setState({double: 1})}
      if(j=== 'XX'){ this.setState({redouble: 1})} 
      if(j=== 'Pass'){ this.setState({pass: 1})}
    }
    if(j === 'R'){
      this.setState({reverse: (this.state.reverse +1)%2})
    }
    if(!isNaN(j)){
      this.setState({value: j, double: '', redouble: '', pass:''})
    }
    if(j.length === 5){
      this.setState({value: '+'+j[4], double: '', redouble: '', pass:'', reverse: ''})
    }

    if(j === 'Reset'){
      this.setState({value: '', trump: '', double: '', redouble: '', reverse: 0, pass: ''})
    }

    //Rework this
    if(j === 'Submit'){
      this.props.moves.bidTrump(j);
    }
  }

  biddingPhaseView(){
    let bidMatrix =[]
    
    let firstBidRow =[]
    firstBidRow.push(<td style={cellEmpty}>{}</td>);
    for(let j =28; j <37; j++){
        firstBidRow.push(
          <td 
            style={cellStyle} 
            key={j} 
            onClick={() => this.handleClick(j)}>
              {j}
          </td>
          );
    }
    firstBidRow.push(<td style={cellEmpty}>{}</td>);
    
    let secondBidRow =[]
    for(let j =37; j <48; j++){
        secondBidRow.push(
          <td 
            style={cellStyle} 
            key={j} 
            onClick={() => this.handleClick(j)}>
              {j}
          </td>
          );
    }
   
    let thirdBidRow =[]
    thirdBidRow.push(<td style={cellEmpty}>{}</td>);
    for(let j =48; j <57; j++){
        thirdBidRow.push(
          <td 
            style={cellStyle} 
            key={j} 
            onClick={() => this.handleClick(j)}>
              {j}
          </td>
          );
    }
    thirdBidRow.push(<td style={cellEmpty}>{}</td>);

    let fourthBidRow =[]
    let cells= ['C','D','H','S', 'NS', 'NT', 'X', 'XX', 'Pass', 'Reset']
    fourthBidRow.push(<td style={cellEmpty}>{}</td>);
    for( const cell of cells){
        fourthBidRow.push(
          <td 
            style={cellStyle} 
            key={cell} 
            onClick={() => this.handleClick(cell)}>
              {cell}
          </td>
          );
    }
    fourthBidRow.push(<td style={cellEmpty}>{}</td>);

    let fifthBidRow= []
    for(let j =1; j <9; j++){
        fifthBidRow.push(
          <td 
            style={cellStyle} 
            key={j} 
            onClick={() => this.handleClick('Plus'+j)}>
              {'+'+ j}
          </td>
          );
    }
    
    let finalBidString = <h4> Your Current Bid is { this.displayBid()}  <button key={'Pass' } onClick={() =>  this.props.moves.bidTrump(this.displayBid())}> {'Submit' }</button></h4>  

    bidMatrix.push(<tr key={"firstrow"}>{firstBidRow}</tr>)
    bidMatrix.push(<tr key={"secondrow"}>{secondBidRow}</tr>)
    bidMatrix.push(<tr key={"thirdrow"}>{thirdBidRow}</tr>)
    bidMatrix.push(<tr key={"fourthrow"}>{fourthBidRow}</tr>)
    bidMatrix.push(<tr key={"fifthrow"}>{fifthBidRow}</tr>)
    bidMatrix.push(<tr key={"sixthrow"}>{finalBidString}</tr>)
    return bidMatrix
 
	}

  playingPhaseView(){
    let finalBidString = <h4> Your Current Bid is { this.displayBid()}  <button key={'Pass' } onClick={() =>  this.props.moves.bidTrump(this.displayBid())}> {'Submit' }</button></h4>  
  	return finalBidString
  }

  render() {
    return (
      	<>
      		<h1> 56 </h1>
      		  {this.displayFiftySixGame()}	
      	</>
    );
  }
}




