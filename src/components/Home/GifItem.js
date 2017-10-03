import React from 'react';

class GifItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { favorited: this.props.isFavorite };
  }

  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gifObj);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.gifObj);
  }

  renderFavoriteHeart = () => {

    if (!this.props.isAuthenticated) {
      return '';
    }

    if (this.state.favorited) {
      return <i className="favorite fa fa-heart" onClick={() => this.unfavoriteGif()} />;
    }

    return <i className="favorite fa fa-heart-o" onClick={() => this.favoriteGif()} />;
  };

  render() {
    return (
      <div className="gif-item">
        { this.renderFavoriteHeart() }
        <img alt={this.props.term}
             src={this.props.gifObj.images.downsized.url}
             onClick={() => this.props.onGifSelect(this.props.gifObj)} />
      </div>
    );
  }
}

export default GifItem;
