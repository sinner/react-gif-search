import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id}
                    term={props.term}
                    gifObj={image}
                    onGifSelect={props.onGifSelect} />
  });

  return (
    <div className="gif-list">{gifItems}</div>
  );
};

export default GifList;
