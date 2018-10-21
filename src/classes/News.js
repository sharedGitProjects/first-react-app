import React from 'react';
import PropTypes from 'prop-types'; 
import Article from './Article' 

export default class News extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  };
  
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render = function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong
          className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
};

