import React from 'react';

const GifItem = (props) => {
  return (
    <div className="gif-item">
      <img alt={props.term} src={props.gif.images.downsized.url} />
    </div>
  )
};

export default GifItem;
