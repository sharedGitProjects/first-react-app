import React from 'react';
import ReactDOM from 'react-dom';

export default class Add extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  };

  componentDidMount = function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  };

  onBtnClickHandler = (e) => {
    e.preventDefault();
    var textEl = ReactDOM.findDOMNode(this.refs.text);
  
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = textEl.value;
  
    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];
  
    window.ee.emit('News.add', item);
  
    textEl.value = '';
    this.setState({textIsEmpty: true});
  };

  onCheckRuleClick = (e) => {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  };

  onFieldChange = (fieldName, e) => {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  };

  render = function() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Ваше имя'
          ref='author'
        />
        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Текст новости'
          ref='text'
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          >
          Показать alert
        </button>
      </form>
    );
  }
};

