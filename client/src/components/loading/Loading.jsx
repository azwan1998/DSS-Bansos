import React from 'react';
import ReactLoading from 'react-loading'
import './loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type="spinningBubbles" color="green" height={50} width={50} />
    </div>
  );
};

export default Loading;