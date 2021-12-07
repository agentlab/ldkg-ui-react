import React from 'react';
import { Spin } from 'antd';
import './index.css';

type Props = {
  isLoading: boolean;
};

export const Overlay = ({ isLoading }: Props) => {
  return isLoading ? (
    <div className='overlay'>
      <Spin className='spin' />
    </div>
  ) : null;
};
