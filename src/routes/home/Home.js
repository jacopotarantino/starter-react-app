/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import FavoriteCelebrity from './FavoriteCelebrity.js';


const fakeNews = [{
  link: 'http://example.com',
  title: 'gary busey',
  contentSnippet: '<strong>i was interpolated</strong>'
}, {
  link: 'http://example.com/2',
  title: 'matt daemon',
  contentSnippet: '<strong>i was interpolated 2</strong>'
}, {
  link: 'http://example.com/3',
  title: 'robert deniro',
  contentSnippet: '<strong>i was interpolated 3</strong>'
}];

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      celebrities: [],
      favoriteCelebrity: ''
    };

    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  fetchCelebrities() {
    fetch('https://randomuser.me/api/?results=5')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({
        celebrities: response.results
      });
    });
  }

  changeFavoriteCelebrity(celebrity) {
    return () => {
      this.setState({
        favoriteCelebrity: `${celebrity.name.first} ${celebrity.name.last}`
      })
    }
  }

  onHeaderClick() {
    this.fetchCelebrities();
  }

  componentDidMount() {
    this.fetchCelebrities();
  }

  renderCelebrityList () {
    const {
      celebrities
    } = this.state;

    if (celebrities.length < 1) {
      return;
    }

    return celebrities.map((celebrity, index) => (
      <li key={index} className={s.newsItem}>

        <a href={`mailto:${celebrity.email}`} className={s.newsTitle}>{celebrity.name.first} {celebrity.name.last}</a>
        <span className={s.newsDesc} onClick={this.changeFavoriteCelebrity(celebrity)}>
          birthday: {celebrity.dob}
        </span>
      </li>
    ))
  }

  render () {
    const {
      celebrities,
      favoriteCelebrity
    } = this.state;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>React.js News</h1>
          <button onClick={this.onHeaderClick}>CLICK ME TO REFRESH!</button>

          <FavoriteCelebrity name={favoriteCelebrity} />

          <ul className={s.news}>
            { this.renderCelebrityList() }
          </ul>

        </div>
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(Home, s);
