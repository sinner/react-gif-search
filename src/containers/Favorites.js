import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/Home/GifList';
import GifModal from '../components/Home/GifModal';
import '../styles/app.css';
import logo from '../logo.svg';

class Favorites extends React.Component {

  componentWillMount() {
    this.props.actions.fetchFavoritedGifs();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Giphy</h2>
        </div>
        <br />

        <div>
          <GifList gifs={ this.props.gifs }
               term={ this.props.term }
               onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) }
               onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
               onFavoriteDeselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
               isAuthenticated={this.props.authenticated}
               isFavorite={true} />
        </div>
        <GifModal modalIsOpen={ this.props.modalIsOpen }
                  selectedGif={ this.props.selectedGif }
                  onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favorites,
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);