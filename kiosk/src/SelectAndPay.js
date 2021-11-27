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
                category={category} handleTab={this.props.handleTab} handlePageNum={this.props.handlePageNum}/>
        );
        return (
        <div className='nav' onClick={(e) => {
            this.props.handleTab(e);
            this.props.handlePageNum(0);
        }}>
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
                <button className='minus'>-</button>
                <div className='count'>{this.props.menu['count']}개</div>
                <button className='plus'>+</button>
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
            <div className='selected_menu_container' onClick={this.props.handlePlusMinus}>
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
            <div className='pay_button' onClick={this.props.pay}>
                결제하기
            </div>
        );
    }
}

class HomeButton extends React.Component{
    render(){
        return (
            <div className='home_button' onClick={this.props.goHome}>
                처음으로
            </div>
        );
    }
}

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.pay = this.pay.bind(this);
    }
    pay(){
        let phoneNumber = prompt('휴대폰 번호를 입력해 주세요(예시:01012345678)');
        if(phoneNumber === null) return;
        while(phoneNumber.match(/[0-9]{10,11}/) === null){
            alert('올바른 번호 형식이 아닙니다');
            phoneNumber = prompt('휴대폰 번호를 입력해 주세요(예시:01012345678)');
        }
        alert(phoneNumber + '로 결제가 완료되었습니다!');
    }
    render(){
        return (
            <div className='sidebar'>
                <div className='cart_title'>장바구니</div>
                <SelectedMenuContainer cart={this.props.cart} handlePlusMinus={this.props.handlePlusMinus}/>
                <PayButton pay={this.pay}/>
                <HomeButton goHome={this.props.goHome}/>
            </div>
        );
    }
}

function ArrowButton(props){
    if(props.display === false) return null;
    let increment = 0;
    if(props.dir === 'right') increment = 1;
    else if(props.dir === 'left') increment = -1;
    return (
        <button className={'arrow ' + props.dir} onClick={(e) => {props.handlePageNum(parseInt(props.menuPageNum) + increment, e)}}/>
    );
}

class ArrowContainer extends React.Component {
    render(){
        let display = null;
        if(this.props.menuPageNum === 0 && this.props.dir === 'left') display = false;
        if(this.props.menuPageNum === this.props.maxPageNum && this.props.dir === 'right') display = false;
        return (
            <div className={'arrow_container ' + this.props.dir}>
                <ArrowButton dir={this.props.dir} display={display} menuPageNum={this.props.menuPageNum}
                    handlePageNum={this.props.handlePageNum}/>
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
        let start = this.props.menuPageNum * 8;
        let end = start + 8;
        return (
            <ul>{list.slice(start, end)}</ul>
        );
    }
}

class MidContainer extends React.Component {
    render(){
        return (
            <div className='mid_container'>
                <CardList cards={this.props.cards} selected={this.props.selected}
                    categories={this.props.categories} menuPageNum={this.props.menuPageNum}/>
            </div>
        );
    }
}

class Container extends React.Component {
    render(){
        let categoryNum = parseInt(this.props.selected);
        let categories = this.props.categories;
        let cards = this.props.cards;
        let categoryName = categories[categoryNum];
        return (
            <div className='container' onClick={this.props.handleCard}>
                <ArrowContainer dir='left' menuPageNum={this.props.menuPageNum} 
                    maxPageNum={Math.floor((cards[categoryNum][categoryName].length - 1) / 8)} handlePageNum={this.props.handlePageNum} />
                <MidContainer cards={this.props.cards} selected={this.props.selected}
                    categories={this.props.categories} menuPageNum={this.props.menuPageNum}/>
                <ArrowContainer dir='right' menuPageNum={this.props.menuPageNum} 
                    maxPageNum={Math.floor((cards[categoryNum][categoryName].length - 1 ) / 8)} handlePageNum={this.props.handlePageNum} />
            </div>
        );
    }
}

class SelectAndPay extends React.Component {
    constructor(props){
        super(props);
        this.state = {menuPageNum: 0};
        this.handlePageNum = this.handlePageNum.bind(this);
    }
    handlePageNum(pageNum){
        this.setState(() => ({menuPageNum: pageNum}));
    }
    render(){
        return (
            <div className='select_and_pay'>
                <Nav categories={this.props.categories} selected={this.props.selected} 
                    handleTab={this.props.handleTab} handlePageNum={this.handlePageNum}/>
                <SideBar cart={this.props.cart} goHome={this.props.goHome} handlePlusMinus={this.props.handlePlusMinus}/>
                <Container cards={this.props.cards} selected={this.props.selected}
                    categories={this.props.categories} handleCard={this.props.handleCard}
                    menuPageNum={this.state.menuPageNum} handlePageNum={this.handlePageNum}/>
            </div>
        );
    }
}

export default SelectAndPay;