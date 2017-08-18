import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import config from './config/main';

import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import request from 'superagent';

class App extends Component {

  constructor() {
    super();
    this.giphyAPIKey = config.giphyAPIKey;
    this.state = {
      gifs: []
    };
  }

  handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${this.giphyAPIKey}`;
    request.get(url, function(err, res) {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            <SearchBar onTermChange={this.handleTermChange} />
        </p>
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
