import React from 'react';

const GifItem = ({term, gifObj, onGifSelect}) => {
  return (
    <div className="gif-item" onClick={() => onGifSelect(gifObj)}>
      <img alt={term} src={gifObj.images.downsized.url} />
    </div>
  )
};

export default GifItem;
