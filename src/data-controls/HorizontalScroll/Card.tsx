import React from 'react';

export const Card = ({ itemId, onClick, children, style }: any): JSX.Element => {
  return (
    <div
      onClick={() => onClick()}
      style={{
        display: 'inline-block',
        margin: '0 10px',
        width: '260px',
        userSelect: 'none',
        ...style,
      }}
      tabIndex={0}
      className='card'>
      {children}
    </div>
  );
};
