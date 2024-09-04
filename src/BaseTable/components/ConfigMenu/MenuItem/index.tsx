/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
