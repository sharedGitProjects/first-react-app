import React from 'react';
import EventEmitter from 'event-emitter';
import Add from './classes/Add' 
import News from './classes/News' 
import './App.css';

var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

window.ee = new EventEmitter();

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      news: my_news
    }
  };

  componentDidMount = function() {
    var self = this;
    window.ee.on('News.add', function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  };

  componentWillUnmount = function() {
    window.ee.off('News.add');
  };

  render = function() {
    return (
      <div className='app'>
        <Add />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </div>
    );
  }
};
