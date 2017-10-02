import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config/main';
import logo from '../logo.svg';
import './Home.css';

import * as Actions from '../actions';
import SearchBar from '../components/Home/SearchBar';
import GifList from "../components/Home/GifList";
import GifModal from "../components/Home/GifModal";

class Home extends Component {

  constructor() {
    super();
    // this.handleTermChange = this.handleTermChange.bind(this);
    this.giphyAPIKey = config.dev.giphyAPIKey;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Giphy</h2>
        </div>
        <br />
        <div className="App-intro">
          <SearchBar onTermChange={this.props.actions.requestGifs} />
        </div>
        <div>{ this.props.gifsRequestMessage }</div>
        <div>
          <GifList gifs={ this.props.gifs }
                   term={ this.props.term }
                   onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } />

        </div>
        <GifModal modalIsOpen={ this.props.modalIsOpen }
                  selectedGif={ this.props.selectedGif }
                  onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    gifs: state.gifs.data,
    term: state.gifs.term,
    gifsError: state.gifs.error,
    gifsRequestMessage: state.gifs.message,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
