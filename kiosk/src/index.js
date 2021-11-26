import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SelectAndPay from './SelectAndPay';

const categories = ['메인메뉴', '세트메뉴', '사이드메뉴', '음료'];
const cards = [
  { '메인메뉴': [
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼1', price: 7000},
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼2', price: 7100 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼3', price: 7200 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼4', price: 7300 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼5', price: 7400 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼6', price: 7500 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼7', price: 7600 },
    { img: 'https://img.seoul.co.kr/img/upload/2017/02/19/SSI_20170219191203.jpg',
    name: '와퍼8', price: 7700 }
  ] }, 
  { '세트메뉴': [
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트1', price: 9000},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트2', price: 9100},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트3', price: 9200},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트4', price: 9300},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트5', price: 9400},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트6', price: 9500},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트7', price: 9600},
    { img: 'http://newsimg.hankookilbo.com/2015/07/13/201507130987385773_1.jpg',
      name: '와퍼세트8', price: 9700}
  ] },
  { '사이드메뉴': [
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이1', price: 2000},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이2', price: 2100},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이3', price: 2200},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이4', price: 2300},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이5', price: 2400},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이6', price: 2500},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이7', price: 2600},
    { img: 'https://image.fmkorea.com/files/attach/images/486616/408/318/034/7223fdc397b3dc1e181b3933eb2caf04.png',
      name: '후렌치후라이8', price: 2700}
  ] },
  { '음료': [
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라1', price: 1500},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라2', price: 1600},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라3', price: 1700},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라4', price: 1800},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라5', price: 1900},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라6', price: 2000},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라7', price: 2100},
    { img: 'https://e7.pngegg.com/pngimages/888/490/png-clipart-fizzy-drinks-coca-cola-zero-mcdonald-s-chicken-mcnuggets-chicken-nugget-coca-cola-pint-glass-milkshake.png',
      name: '콜라8', price: 2200},
  ] }
];

ReactDOM.render(<SelectAndPay categories={categories} cards={cards} />, document.getElementById('root'));
