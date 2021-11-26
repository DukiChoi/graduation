import React from 'react';
import './SelectAndPay.css';

function CategoryTab(props){
    let className = 'category_tab';
    if (props.idx === props.selected) className = className + ' selected';
    return <li className={className} id={props.idx}><div>{props.category}</div></li>;
}

class Nav extends React.Component {
    render(){
        let listItems = this.props.categories.map((category, idx) => 
            <CategoryTab idx={idx} selected={this.props.selected} key={idx} 
                category={category} handleTab={this.props.handleTab}/>
        );
        return (
        <div className='nav' onClick={this.props.handleTab}>
            <ul>{listItems}</ul>
        </div>
        );
    };
}

class SelectedMenuTotal extends React.Component {
    render(){
        let amount = 0;
        this.props.cart.forEach(function(e){
            amount += (e.price) * (e.count);
        });
        
        return (
            <div className='selected_menu_total'>
                <div className='total_title'>합계</div>
                <div className='total_amount'>{amount.toLocaleString()}원</div>
            </div>
        );
    }
}


class SelectedMenu extends React.Component {
    render(){
        return(
            <li className='selected_menu'>
                <div className='name'>{this.props.menu['name']}</div>
                <div className='count'>{this.props.menu['count']}개</div>
            </li>
        );
    }
}

function SelectedMenuLabel() {
    return (
        <div className='selected_menu_label'>
            <div className='label_title'>메뉴</div>
            <div className='label_count'>수량</div>
        </div>
    );
}

class SelectedMenuContainer extends React.Component{
    render(){
        let list = this.props.cart.map((menu) => 
            <SelectedMenu menu={menu} key={menu['name']}/>
        );
        return (
            <div className='selected_menu_container'>
                <SelectedMenuLabel/>
                <ul>{list}</ul>
                <SelectedMenuTotal cart={this.props.cart}/>
            </div>
        );
    }
}

class PayButton extends React.Component{
    render(){
        return (
            <div className='pay_button'>
                결제하기
            </div>
        );
    }
}

class HomeButton extends React.Component{
    render(){
        return (
            <div className='home_button'>
                처음으로
            </div>
        );
    }
}

class SideBar extends React.Component {
    render(){
        return (
            <div className='sidebar'>
                <div className='cart_title'>장바구니</div>
                <SelectedMenuContainer cart={this.props.cart}/>
                <PayButton/>
                <HomeButton/>
            </div>
        );
    }
}

function ArrowButton(props){
    return (
        <button className={'arrow ' + props.dir}>

        </button>
    );
}

class ArrowContainer extends React.Component {
    render(){
        return (
            <div className={'arrow_container ' + this.props.dir}>
                <ArrowButton dir={this.props.dir}/>
            </div>
        );
    }
}

function Card(props) {
    return (
        <li className='menu_card'>
            <img className='menu_img' src={props.card.img} alt={props.card.name}/>
            <div className='menu_name'>{props.card.name}</div>
            <div className='menu_price'>{'￦ ' + props.card.price.toLocaleString()}</div>
        </li>
    );
}

class CardList extends React.Component {
    
    render(){
        let category_idx = this.props.selected;
        let category_name = this.props.categories[category_idx];
        let cards = this.props.cards[category_idx][category_name];
        let list = cards.map((card) => 
            <Card card={card} key={card.name}/>
        );
        return (
            <ul>{list}</ul>
        );
    }
}

class MidContainer extends React.Component {
    render(){
        return (
            <div className='mid_container'>
                <CardList cards={this.props.cards} selected={this.props.selected}
                    categories={this.props.categories}/>
            </div>
        );
    }
}

class Container extends React.Component {
    render(){
        return (
            <div className='container' onClick={this.props.handleCard}>
                <ArrowContainer dir='left'/>
                <MidContainer cards={this.props.cards} selected={this.props.selected}
                    categories={this.props.categories}/>
                <ArrowContainer dir='right'/>
            </div>
        );
    }
}

class SelectAndPay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0,
            cart: []
        };
        this.handleTab = this.handleTab.bind(this);
        this.handleCard = this.handleCard.bind(this);
    }
    handleTab(e){
        if(e.target.tagName === 'DIV'){
            let idx = parseInt(e.target.parentNode.id);
            this.setState(function(state) {
                if(state.selected !== idx){
                    return {selected: idx};
                }
            });
        }
    }
    handleCard(e){
        let card = e.target.parentNode, name, price;
        if(card.className === 'menu_card'){
            name = card.querySelector('.menu_name').innerText;
            price = parseInt(card.querySelector('.menu_price').innerText.replaceAll(',', '').replaceAll('￦',''));
            this.setState(function(state){
                let cart = state.cart;
                let updated = false;
                for(let i = 0; i < cart.length; i++){
                    if(cart[i].name === name){
                        cart[i].count += 1;
                        updated = true;
                        break;
                    }
                }
                if(updated === false){
                    cart.push({name: name, price: price, count: 1});
                }
                return cart;
            });
        }
    }
    render(){
        return (
            <div className='select_and_pay'>
                <Nav categories={this.props.categories} selected={this.state.selected} 
                    handleTab={this.handleTab}/>
                <SideBar cart={this.state.cart}/>
                <Container cards={this.props.cards} selected={this.state.selected}
                    categories={this.props.categories} handleCard={this.handleCard}/>
            </div>
        );
    }
}

export default SelectAndPay;