import React, { Component } from 'react';
import request from 'superagent';
import logo from './logo.svg';
import './App.css';
import config from './config/main';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import GifModal from './components/GifModal';


class App extends Component {

  constructor() {
    super();
    // this.handleTermChange = this.handleTermChange.bind(this);
    this.giphyAPIKey = config.giphyAPIKey;
    this.state = {
      gifs: [],
      term: '',
      selectedGif: null,
      modalIsOpen: false
    };
  }

  handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=${this.giphyAPIKey}`;
    request.get(url, (err, res) => {
      this.setState({
        gifs: res.body.data,
        term: term
      });
    });
  };

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <br />
        <div className="App-intro">
            <SearchBar term={this.state.term} onTermChange={this.handleTermChange} />
        </div>
        <GifList gifs={this.state.gifs} />
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

export default App;
