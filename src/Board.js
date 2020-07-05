import React from 'react';


export class fiftysixBoard extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          value : '',
          trump: '',
          double: '',
          redouble: '',
          reverse: '',
          pass:'',
          bidComplete:''
		}
    }

    displayBid(){
    	let bidString=''
    	if(this.state.bidComplete === 1){
    		if(this.state.double === 1){
    			return "X"
    		}
    		if(this.state.redouble === 1){
    			return "XX"
    		}
    		if(this.state.reverse === 1){
    			bidString= this.state.trump+this.state.value
    			return bidString
    		}
    		if(this.state.pass === 1){
    			return "Pass"
    		}
    		bidString=this.state.value+this.trump		
    	} else{
    		if(this.state.reverse === 1){
    			bidString = this.state.trump+this.state.value
    		}
    		else{
    			bidString = this.state.value+this.state.trump
    		}

    	}
    	return bidString
    }
  	onSubmitBid(bidString) {
      this.props.moves.bidTrump(bidString);
    }

    resetBid(){
      this.setState({value: '', trump: '', double: '', redouble: '', reverse: '', pass: '', bidComplete: ''})
    }
  	handleValue(j){
  		if(this.state.bidComplete === ''){
        if(j === 'C' || j === 'D' || j === 'H' || j === 'S' || j === 'NT' || j === 'NS'){
              this.setState({trump: j, double: '', redouble: '', reverse: '', pass:''})
        }
        if(j === 'X' || j ==='XX' || j === 'P'){
          this.setState({value: '', trump: '', reverse: '', pass: '', bidComplete: 1, double: '', redouble: ''})
          if(j=== 'X'){ this.setState({double: 1})}
          if(j=== 'XX'){ this.setState({redouble: 1})} 
          if(j=== 'P'){ this.setState({pass: 1})}
  		  }
        if(j === 'R'){
          if (this.state.reverse === ''){
            this.setState({reverse: 1})}
          else{
            this.setState({reverse: ''})}
        }
        if(!isNaN(j)){
          this.setState({value: j})
        }
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
	fourthBidRow.push(<td style={cellEmpty}> {''}</td>);
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
  


	bidMatrix.push(<tr key={"firstrow"}>{firstBidRow}</tr>)
	bidMatrix.push(<tr key={"secondrow"}>{secondBidRow}</tr>)
	bidMatrix.push(<tr key={"thirdrow"}>{thirdBidRow}</tr>)
	bidMatrix.push(<tr key={"fourthrow"}>{fourthBidRow}</tr>)
	return bidMatrix
	}

	render() {
    	return (
      		<>
      			{this.bidArea()}
      			<h4> Current Bid is { this.displayBid()} </h4>
      		</>
    	);
	}
}

