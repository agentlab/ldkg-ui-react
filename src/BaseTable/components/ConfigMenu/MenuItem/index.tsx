import React, { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';

export const MenuItem: React.FC<any> = ({ title, onClick, colState }) => {
  const [pickOn, setPickOn] = useState(!colState);

  useEffect(() => {
    setPickOn(!colState);
  }, [colState]);
  return (
    <div
      onClick={(e) => {
        setPickOn(!pickOn);
        onClick(pickOn);
      }}>
      {pickOn ? <CheckOutlined /> : <div style={{ display: 'inline-block', width: '14px' }} />}
      <span>{title}</span>
    </div>
  );
};
