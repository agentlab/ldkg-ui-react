/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
