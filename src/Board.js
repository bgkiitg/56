import React from 'react';


export class fiftysixBoard extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          value : '',
          trump: '',
          double: '',
          redouble: '',
          reverse: 0,
          pass:'',
		  }
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
  	onSubmitBid(bidString) {
      this.props.moves.bidTrump(bidString);
    }

    resetBid(){
      this.setState({value: '', trump: '', double: '', redouble: '', reverse: 0, pass: ''})
    }
  	handleValue(j){
      if(j === 'C' || j === 'D' || j === 'H' || j === 'S' || j === 'NT' || j === 'NS'){
        this.setState({trump: j, double: '', redouble: '', pass:''})
      }
      if(j === 'X' || j ==='XX' || j === 'P'){
        this.resetBid()
        if(j=== 'X'){ this.setState({double: 1})}
        if(j=== 'XX'){ this.setState({redouble: 1})} 
        if(j=== 'P'){ this.setState({pass: 1})}
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
    }

  	bidArea(){
  	const cellStyle = {
      	border: '1px solid #555',
      	width: '50px',
      	height: '50px',
      	lineHeight: '50px',
      	textAlign: 'center',
    };



    const cellEmpty = {
		width: '50px',
		height: '50px',
		lineHeight: '50px',
		textAlign: 'center'		
	};

	let bidMatrix =[]

	// First bid row
	let firstBidRow =[]
	firstBidRow.push(<td style={cellEmpty}>{}</td>);
	for(let j =28; j <37; j++){
      	firstBidRow.push(<td style={cellStyle} key={j} onClick={() => this.handleValue(j)}>{j}</td>);
    }
	firstBidRow.push(<td style={cellEmpty}>{}</td>);


	// Second bid row
	let secondBidRow =[]
	for(let j =37; j <48; j++){
      	secondBidRow.push(<td style={cellStyle} key={j} onClick={() => this.handleValue(j)}>{j}</td>);
    }
	

	// Third bid row
	let thirdBidRow =[]
	thirdBidRow.push(<td style={cellEmpty}>{}</td>);
	for(let j =48; j <57; j++){
      	thirdBidRow.push(<td style={cellStyle} key={j} onClick={() => this.handleValue(j)}>{j}</td>);
    }
	thirdBidRow.push(<td style={cellEmpty}>{}</td>);


	//Fourth bid row


	let fourthBidRow =[]
	//fourthBidRow.push(<td style={cellEmpty}> {''}</td>);
	fourthBidRow.push(<td style={cellStyle} key={'C'	} onClick={() => this.handleValue('C')}> {'C' }</td>)
	fourthBidRow.push(<td style={cellStyle} key={'D'	} onClick={() => this.handleValue('D')}> {'D' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'H'	} onClick={() => this.handleValue('H')}> {'H' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'S'	} onClick={() => this.handleValue('S')}> {'S' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'NS'	} onClick={() => this.handleValue('NS')}> {'NS' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'NT'	} onClick={() => this.handleValue('NT')}> {'NT' }</td>);
	fourthBidRow.push(<td style={cellStyle}	onClick={() => this.resetBid()}> 	{'Reset'  }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'R'	} onClick={() => this.handleValue('R')}> {'R' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'X'	} onClick={() => this.handleValue('X')}> {'X' }</td>);
	fourthBidRow.push(<td style={cellStyle} key={'XX'	} onClick={() => this.handleValue('XX')}>{'XX'}</td>);
	fourthBidRow.push(<td style={cellStyle} key={'Pass'	} onClick={() => this.handleValue('P')}> {'P' }</td>);
  

  let fifthBidRow= []
  fifthBidRow.push(<td style={cellEmpty}> {''}</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+1' } onClick={() => this.handleValue('Plus1')}> {'+1' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+2' } onClick={() => this.handleValue('Plus2')}> {'+2' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+3' } onClick={() => this.handleValue('Plus3')}> {'+3' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+4' } onClick={() => this.handleValue('Plus4')}> {'+4' }</td>);
  fifthBidRow.push(<td style={cellEmpty}> {''}</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+5' } onClick={() => this.handleValue('Plus5')}> {'+5' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+6' } onClick={() => this.handleValue('Plus6')}> {'+6' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+7' } onClick={() => this.handleValue('Plus7')}> {'+7' }</td>);
  fifthBidRow.push(<td style={cellStyle} key={'+8' } onClick={() => this.handleValue('Plus8')}> {'+8' }</td>);
	
  bidMatrix.push(<tr key={"firstrow"}>{firstBidRow}</tr>)
	bidMatrix.push(<tr key={"secondrow"}>{secondBidRow}</tr>)
	bidMatrix.push(<tr key={"thirdrow"}>{thirdBidRow}</tr>)
	bidMatrix.push(<tr key={"fourthrow"}>{fourthBidRow}</tr>)
  bidMatrix.push(<tr key={"fifthrow"}>{fifthBidRow}</tr>)
	return bidMatrix
	}

	render() {
    	return (
      		<>
      			{this.bidArea()}
      			<h4> Your Current Bid is { this.displayBid()}  <button key={'Pass' } onClick={() => this.onSubmitBid(this.displayBid())}> {'Submit' }</button></h4>
      		</>
    	);
	}
}

