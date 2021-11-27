import React from 'react';
import './HereOrToGo.css';

function Here(props){
    return(
        <div className='here' onClick={props.goSelectAndPay}>매장 식사</div>
    );
}

function ToGo(props){
    return(
        <div className='to_go' onClick={props.goSelectAndPay}>포장</div>
    );
}

class HereOrToGo extends React.Component {
    render(){
        return (
        <div className='here_or_to_go'>
            <Here goSelectAndPay={this.props.goSelectAndPay}/>
            <ToGo goSelectAndPay={this.props.goSelectAndPay}/>
        </div>
        );
    }
}

export default HereOrToGo;