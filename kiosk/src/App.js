import React from 'react';
import './App.css';

class Home extends React.Component{
    constructor(props) {
		super(props);
		this.state = {};
        //this.props.setFlag("eatHere", true);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { eatHere: true };
        //this.setFlag = this.setFlag.bind(this);
	}
	setFlag(k, v) {
		this.setState({ k: v });
	}
	render() {
		return (
        <div className='App'>
            <Home setFlag={this.setFlag}/>
            {console.log(this.state.eatHere)}
        </div>
        );
	}
}

export default App;
